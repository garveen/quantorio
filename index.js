var calcRequirements = function(rendering) {
    var requirements = {}
    var saves = []
    var html = ''
    $('#thead-target').children().each(function() {
        var $this = $(this)
        var target = $this.find('.select-target').data('val')
        var needs = $this.find('.input-amount').val()
        var recipe = recipes[target]
        requirements = getUpstreamsRecursive(target, needs, requirements, rendering)

    })
    return requirements;
}

var render = function() {
    var requirements = calcRequirements(true)
    var html = ''
    $.each(requirements, function(k, v) {
        html += generateRow({
            hasName: k,
            hasRemove: false,
            hasTarget: '<div class="icon" data-icon="' + items[k].icon + '">&nbsp;</div> ' + translate(k),
            hasAssemble: getAssemblingSelector(k)
        })

    })

    $('#table-material tbody').html(html).find('.icon').each(getImage)
    calc()

}
var getTargetRow = function(val) {
    return generateRow({
        hasClass: 'success',
        hasTarget: getTargetSelector(val),
        hasAmountInput: true,
        hasRemove: true
    })
}

var generateRow = function(user_config) {
    var config = {
        hasClass: false,
        hasName: false,
        hasRemove: false,
        hasAmountInput: false,
        hasTarget: false,
        hasAssemble: false
    }
    $.each(user_config, function(k, v) {
        config[k] = v
    })
    return '<tr' + (config.hasClass ? ' class="' + config.hasClass + '"' : '') + (config.hasName ? ' data-name="' + config.hasName + '"' : '') + '>' +
        (config.hasRemove ? '<td class="row-remove"><a class="btn btn-danger">-</a></td>' : '<td></td>') +
        '<td>' + config.hasTarget + '</td>' +
        '<td' + (config.hasAmountInput ? '' : ' class="td-amount"') + '>' + (config.hasAmountInput ? '<input type="text" class="form-control input-amount" value="1" />' : '') + '</td>' +
        '<td class="td-assembling-select">' + config.hasAssemble + '</td>' +
        '<td class="machine-count"></td><td class="machine-power"></td><td class="machine-pollution"></td></tr>'
}

var calc = function() {
    var requirements = calcRequirements(false)
    var total_electric_power = 0;
    var total_pollution = 0;

    var saves = []
    var tmpsaves = {}

    var _calc = function(k, v) {

        var tr = $('tr[data-name=' + k + ']');
        var machine_name = tr.find('.select-assembling').val()
        var machine = machines[machine_name]
        if (machine) {
            saves.push(k + ':' + machine_name)
            tmpsaves[k] = machine_name
        }

        tr.find('.td-amount').html(Math.round(v * 1000) / 1000)

        if (typeof machine == 'undefined') {
            tr.find('.machine-count').html('')
            tr.find('.machine-power').html('')
            tr.find('.machine-pollution').html('')
        } else {

            var recipe = recipes[k]
            if (machine.type == 'mining-drill') {
                var resource = resources[k]
                var count = v / 60 * resource.mining_time / machine.mining_speed / (machine.mining_power - resource.hardness)
            } else {
                var count = v / 60 / machine.crafting_speed * recipe.energy_required / recipe.result_count
            }
            tr.find('.machine-count').html(Math.round(count * 1000) / 1000)
            var power = 0
            if (machine.energy_source && machine.energy_source.type == 'electric') {
                power = machine.energy_usage * count;
                total_electric_power += power

            }
            tr.find('.machine-power').html(Math.round(power * 1000) / 1000 + ' kW')
            total_pollution += machine.energy_usage * count * machine.energy_source.emissions;
            tr.find('.machine-pollution').html(Math.round(machine.energy_usage * count * machine.energy_source.emissions * 1000) / 1000)
        }
    }

    $('#thead-target').children().each(function() {
        var $this = $(this)
        var target = $this.find('.select-target').data('val')
        var needs = $this.find('.input-amount').val()
        _calc(target, needs)
        saves[saves.length - 1] += ';' + needs

    })
    $.each(tmpsaves, function(k, v) {
        requirementMachines[k] = v
    })
    saveHash('targets', saves.join(','))

    saves = []
    tmpsaves = {}
    $.each(requirements, _calc)
    $.each(tmpsaves, function(k, v) {
        requirementMachines[k] = v
    })

    saveHash('requirements', saves.join(','))


    $('.total-power').html(Math.round(total_electric_power * 1000) / 1000 + ' kW')
    $('.total-pollution').html(Math.round(total_pollution * 1000) / 1000)



}


var getUpstreamsRecursive = function(target, needs, quantities, rendering) {
    var recipe = recipes[target]
    if (typeof recipe == 'undefined') return quantities
    var ingredients = recipe.ingredients

    var show_resource = $('#show-resource').is(':checked')
    $.each(ingredients, function(k, v) {

        ingredient = items[k];
        if (!show_resource && typeof resources[k] != 'undefined') {
            return true;
        }
        if (typeof quantities[k] == 'undefined') {
            quantities[k] = 0;
        }
        if (typeof ingredient == 'undefined') {
            console.log(k);
        }
        quantity = v * needs / recipe.result_count;
        quantities[k] += quantity;

        quantities = getUpstreamsRecursive(k, quantity, quantities, rendering);
    })

    if (!rendering) {
        $.each(recipe.results, function(k, v) {
            if (typeof quantities[k] == 'undefined') {
                quantities[k] = 0;
            }
            quantities[k] += v.amount * needs;
        })
    }



    return quantities;


}

var getAssemblingSelector = function(name, val) {
    var recipe = recipes[name]
    if (typeof recipe == 'undefined' || typeof categories[recipe.category] == 'undefined') {
        if (typeof resources[name] != 'undefined') {
            category = resources[name].category
        } else {
            return ''
        }
    } else {
        category = recipe.category
    }
    if (typeof val == 'undefined') {
        if (typeof requirementMachines[name] != 'undefined') {
            val = requirementMachines[name]
        } else {
            val = categories[category][0]
        }
    }
    html = '<div class="icon" data-icon="' + items[val].icon + '">&nbsp;</div> <select class="select-assembling form-control select-translate" data-name="' + name + '">';

    $.each(categories[category], function(k, name) {
        if (machines[name].type == 'assembling-machine' && machines[name].ingredient_count < recipe.ingredient_count) return true
        html += '<option value="' + name + '"' + (val == name ? 'selected="selected"' : '') + '>' + translate(name, true) + '</option>';
    })
    html += '</select>';
    return html;
}

var getTargetSelector = function(val) {
    if (typeof val == 'undefined') {
        val = 'player'
    }
    target_no++
    var html = '<div class="select-target" data-val="' + val + '" data-target-no="' + target_no + '"><a href="javascript:;" class="btn btn-default"><div class="icon" data-icon="' + items[val].icon + '">&nbsp;</div> ' + translate(val) + '</a></div>'
    return html

}

var changeLanguage = function(language) {
    var _change = function() {
        currentLanguage = language;
        saveHash('language', language);
        $('.translate').each(function() {
            var $this = $(this)
            $this.html(translate($this.data('string'), true))
        })
        $('.select-translate').each(function() {
            var $this = $(this)
            if ($this.hasClass('select-assembling')) {
                var $new = $(getAssemblingSelector($this.data('name'), $this.val()))

                $this.parent().html($new).find('.icon').each(getImage)
            }
        })
        $('abbr').each(function() {
            $(this).attr('title', translate($(this).data('string'), true))
        })
    }
    if (typeof translations[language] != 'undefined') {
        _change();
    } else {
        $.ajax({
            url: 'translations/' + language + '.js?v=2',
            dataType: 'json',
            async: false,
            success: function(data) {
                translations[language] = data;
                _change()
            },
            error: function(data) {
                alert('load translations error')
            }
        })
    }
}

var hashes = {}
var requirementMachines = {}

var saveHash = function(name, value) {
    hashes[name] = value
    var tmp = []
    $.each(hashes, function(k, v) {
        tmp.push(k + '=' + v)
    })
    window.location.hash = tmp.join('&')
}

var loadHash = function() {
    var hashStr = window.location.hash.substring(1)
    if (!hashStr) return;
    var tmp = hashStr.split('&')
    $.each(tmp, function(i, v) {
        var hash = v.split('=')
        hashes[hash[0]] = hash[1]
    })
}

var loadLanguage = function() {

    if (typeof translateFallback == 'undefined') {
        translateFallback = 'en';
    }
    if (typeof currentLanguage == 'undefined') {
        if (typeof hashes['language'] != 'undefined') {
            currentLanguage = hashes['language']
        } else {
            var testLanguage = navigator.language || navigator.userLanguage
            if (languages.indexOf(testLanguage) < 0) {
                currentLanguage = translateFallback;
            } else {
                currentLanguage = testLanguage
            }
        }
    }
    var currentLanguageBak = currentLanguage

    changeLanguage(translateFallback)
    changeLanguage(currentLanguageBak)
}

var loadTargetRequirement = function() {
    // return
    if (typeof hashes['show_resource'] != 'undefined') {
        $('#show-resource').prop('checked', hashes['show_resource'] == 'true')
    }
    if (typeof hashes['targets'] != 'undefined' && hashes['targets'] != '') {
        var thead = $('#thead-target')
        thead.html('')

        $.each(hashes['targets'].split(','), function(k, v) {
            if (!v) return true;
            var line = v.split(':')
            var target = line[0]
            var info = line[1].split(';')
            var machine = info[0]
            var needs = info[1]
            var row = $(getTargetRow(target))
            row.find('.input-amount').val(needs)
            row.attr('data-name', target)
            row.find('.td-assembling-select').html(getAssemblingSelector(target)).find('.icon').each(getImage)
            row.find('.select-assembling').val(machine)
            thead.append(row)

        })
        thead.find('.icon').each(getImage)
        var requirementsBak = hashes['requirements']
        render()

        if (typeof requirementsBak != 'undefined' && requirementsBak != '') {
            var tbody = $('#table-material tbody')
            $.each(requirementsBak.split(','), function(k, v) {
                var line = v.split(':')
                var name = line[0]
                var machine = line[1]
                tbody.find('tr[data-name=' + name + '] .select-assembling').val(machine)
                requirementMachines[name] = machine
            })

        }

        calc()

    }
}

var rawTranslate = function(key) {
    if (typeof translations[currentLanguage][key] != 'undefined') {
        return translations[currentLanguage][key];
    } else if (typeof translations[translateFallback][key] != 'undefined') {
        return translations[translateFallback][key];
    } else {
        // console.log(key);
        return key;
    }
}
var translate = function(key, is_raw) {
    if (typeof is_raw == 'undefined') {
        is_raw = false
    }
    if (is_raw) {
        return rawTranslate(key)
    } else {
        return '<span class="translate" data-string="' + key + '">' + rawTranslate(key) + '</span>'
    }
}

var initTargetSelector = function() {
    var modal = $('#modal-target-selector')
    var orders = {}

    var html = '<ul class="nav nav-tabs" role="tablist">'
    var panel = ''
    var actived = false
    $.each(groups, function(group_name, config) {
        var html_append = ''
        var panel_append = ''
        var is_append = false
        var icon = config.icon
        html_append += '<li role="presentation" class="target-selector-tabs' + (actived ? '' : ' active') + '"><a href="#selector-' + group_name + '" aria-controls="selector-' + group_name + '" role="tab" data-toggle="tab">' + '<img src="' + config.icon + '"/> ' + '</a></li>'
        panel_append += '<div role="tabpanel" class="tab-pane' + (actived ? '' : ' active') + '" id="selector-' + group_name + '"><div class="table">'
        $.each(config.subgroups, function(subgroup_name, order) {
            if (typeof subgroups[subgroup_name] == 'undefined') return true
            panel_append += '<div class="table-row">'
            var keys = []
            var to_appends = {}
            $.each(subgroups[subgroup_name], function(item_name, j) {
                // console.log(item_name)
                var item = items[item_name]
                if (typeof recipes[item_name] != 'undefined') {
                    is_append = true
                } else {
                    return true
                }
                if (typeof to_appends[item.order] == 'undefined') {
                    keys.push(item.order)
                    to_appends[item.order] = ''
                }
                to_appends[item.order] += '<abbr title="" data-string="' + item_name + '"><a href="javascript:;" class="select-this-target" data-name="' + item_name + '"><div class="icon" data-icon="' + item.icon + '">&nbsp;</div></a></abbr>'
            })
            keys.sort()
            $.each(keys, function(l, order) {
                panel_append += to_appends[order]
            })
            panel_append += '</div>'
        })
        panel_append += '</div></div>'
        if (is_append) {
            html += html_append
            panel += panel_append
            actived = true
        }
    })
    html += '</ul><div class="tab-content">' + panel + '</div></div>'
    modal.find('.modal-body').html(html)
    modal.find('.icon').each(getImage)

    modal.find('.target-selector-tabs a').click(function(e) {
        e.preventDefault()
        $(this).tab('show')
    })

    modal.find('.select-this-target').click(function() {
        var val = $(this).data('name')
        var el = $('#thead-target .select-target[data-target-no=' + target_selecting + ']')
        el.data('val', val)
        el.find('a').html('<div class="icon" data-icon="' + items[val].icon + '">&nbsp;</div> ' + translate(val)).find('.icon').each(getImage)

        var tr = el.closest('tr');
        tr.find('.td-assembling-select').html(getAssemblingSelector(val)).find('.icon').each(getImage)
        tr.attr('data-name', val);
        modal.modal('hide')
        render()
    })
}

var getImage = function() {
    var el = $(this)
    var url = el.data('icon')
    if (imageLoading[url]) {
        imageLoading[url].push(el)
        return
    } else {
        imageLoading[url] = [el]
    }
    if (window.localStorage && window.localStorage.getItem) {
        var compressed = window.localStorage.getItem('icon-' + url)
        var dataURL
        if (compressed) {
            dataURL = Base64String.decompress(compressed)
        }
        if (dataURL && dataURL.substring(0, 22) != 'data:image/png;base64,') {
            $.each(imageLoading[url], function(i, el) {
                el.css('background-image', 'url(data:image/png;base64,' + dataURL + ')')
            })
            imageLoading[url] = null
        } else {
            $('<img src="' + url + '">').load(function() {
                var img = $(this)[0]
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL("image/png");
                try {
                    window.localStorage.setItem('icon-' + url, Base64String.compress(dataURL.substring(22)))
                } catch (e) {
                    storage.clear()
                }
                $.each(imageLoading[url], function(i, el) {
                    el.css('background-image', 'url(' + dataURL + ')')
                })
                imageLoading[url] = null
            });
        }
    }
}

var target_selecting;
$('#thead-target').on('click', '.select-target a', function() {
    target_selecting = $(this).parent().data('target-no')
    $('#modal-target-selector').modal('show')
})

$('#thead-target').on('keyup keydown keypress DOMAttrModified propertychange change', '.input-amount', calc)


var target_no = 0
$('#add-row a').click(function() {
    $('#thead-target').append(getTargetRow()).find('.icon').each(getImage)
})

$('#table-material').on('click', '.row-remove a', function() {
    $(this).closest('tr').remove()
    render()
})

$('#select-translate').change(function() {
    changeLanguage($(this).val())
})

$('#container').on('change', '.select-assembling', function() {
    $(this).prev().attr('src', items[$(this).val()].icon)
    calc()
})

$('#show-resource').change(function() {
    var show_resource = $(this).is(':checked') ? 'true' : 'false'
    saveHash('show_resource', show_resource)
    render()
})



var imageLoading = {}
var translations = [];
var translateFallback, currentLanguage

$(function() {
    loadHash()

    loadLanguage()
    loadTargetRequirement()
    initTargetSelector()

    var html = '';

    $.each(languages, function(k, v) {
        html += '<option value="' + v + '">' + v + '</option>'
    })
    $('#select-translate').html(html)
    $('#select-translate').val(currentLanguage)
    changeLanguage(currentLanguage)
})
