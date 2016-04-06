var imageLoading = {}
var translations = [];
var translateFallback, currentLanguage
var target_selecting;
var target_no = 0
var demos = []
var nameDelimiter = '-_-'


var calcRequirements = function (max_depth) {
    var saves = []
    var html = ''
    requirements = {}
    $('#tbody-target').children().each(function () {
        var $this = $(this)
        var target = $this.find('.select-target').data('val')
        var needs = $this.find('.input-amount').val()
        requirements = getUpstreamsRecursive($this.data('type'), target, needs, requirements, max_depth)

    })
    return requirements
}

var getTarget = function (type, name) {
    if (typeof type != 'undefined') {
        if (typeof window[type + 's'][name] != 'undefined') {
            return window[type + 's'][name]
        }
    }
    return items[name]
}

var getIcon = function (type, name) {
    var target = getTarget(type, name)
    if (typeof target.icon != 'undefined') {
        return target.icon
    } else {
        return getTarget('item', name).icon
    }
}

var removeFromArray = function (arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var render = function () {
    var requirements = calcRequirements()
    var html = ''
    $.each(requirements, function (k, v) {
        html += generateRow({
            hasName: k,
            hasType: v.type,
            hasTarget: '<div class="icon icon-' + v.type + '" data-icon="' + getIcon(v.type, k) + '">&nbsp;</div> ' + translate(k),
            hasAssemble: getAssemblingSelectorEx(v.type, k)
        })

    })

    $('#tbody-remainder').html(html).find('.icon').each(getImage)
    calc.full(requirements)
}
var getTargetRow = function (type, val) {
    return generateRow({
        hasClass: 'success',
        hasTarget: getTargetSelector(type, val),
        hasAmountInput: true,
        hasRemove: true,
        hasExpand: true
    })
}

var generateRow = function (user_config) {
    var config = {
        hasClass: false,
        hasName: false,
        hasType: false,
        hasRemove: false,
        hasExpand: true,
        hasAmountInput: false,
        hasAmount: false,
        hasTarget: false,
        hasAssemble: false
    }
    $.each(user_config, function (k, v) {
        config[k] = v
    })
    return '<tr' + (config.hasClass ? ' class="' + config.hasClass + '"' : '') + (config.hasName ? ' data-name="' + config.hasName + '"' : '') + (config.hasType ? ' data-type="' + config.hasType + '"' : '') + '><td>' +
        (config.hasRemove ? '<a class="btn btn-danger btn-mono row-remove">-</a>' : '') + (config.hasExpand ? '<a class="btn btn-info btn-mono row-expand">&gt;</a>' : '') +
        '</td><td>' + config.hasTarget + '</td>' +
        '<td' + (config.hasAmountInput ? '' : ' class="td-amount"') + '>' + (config.hasAmountInput ? '<input type="text" class="form-control input-amount" value="1" />' : '') + (config.hasAmount !== false ? config.hasAmount : '') + '</td>' +
        '<td class="td-assembling-select">' + config.hasAssemble + '</td>' +
        '<td class="machine-count"></td><td class="machine-power"></td><td class="machine-pollution"></td></tr>'
}

var calcTimeout
var calcWithRequirements = function () {
    clearTimeout(calcTimeout)
    calcTimeout = setTimeout(function () {
        var requirements = calcRequirements()
        calc.full(requirements)
    }, 100);

}

var calc = {
    init: function () {
        calc.total_electric_power = 0;
        calc.total_pollution = 0;

        calc.saves = {}
        return calc
    },

    full: function (requirements) {
        calc.init()

        $('#tbody-target').children().each(function () {
            var $this = $(this)
            var target = $this.find('.select-target').data('val')
            var needs = $this.find('.input-amount').val()
            calc.single(target, { value: needs })
            calc.saves[target] += ';' + needs

        })

        saveHash('targets', calc.saves)

        calc.saves = {}
        $.each(requirements, calc.single)

        $('.total-power').html(Math.round(calc.total_electric_power * 1000) / 1000 + ' kW')
        $('.total-pollution').html(Math.round(calc.total_pollution * 1000) / 1000)
    },

    single: function (name, config, tr) {
        var value
        if (typeof tr == 'undefined') {
            tr = $('tr[data-name=' + name + ']');
        }
        if (typeof config == 'undefined') {
            var td = tr.find('.td-amount')
            if (td.length) {
                value = parseFloat(td.html())
            } else {
                value = tr.find('.input-amount').val()
            }
        } else {
            value = config.value
        }

        var machine_name = tr.find('.select-assembling').val()
        var machine = machines[machine_name]
        if (machine) {
            calc.saves[name] = machine_name
            requirementMachines[name] = machine_name

            saveHash('requirements', calc.saves)
        }
        if (config) {
            tr.find('.td-amount').html(Math.round(value * 1000) / 1000)
        }

        if (typeof machine == 'undefined') {
            tr.find('.machine-count').html('')
            tr.find('.machine-power').html('')
            tr.find('.machine-pollution').html('')
        } else {

            var recipe = recipes[name]
            if (machine.type == 'mining-drill') {
                var resource = resources[name]
                var count = value / 60 * resource.mining_time / machine.mining_speed / (machine.mining_power - resource.hardness)
            } else if (machine.type == 'lab') {
                var technology = technologys[name]

                var count = value / 60 * technology.time * technology.count
            } else {
                var count = value / 60 / machine.crafting_speed * recipe.energy_required / recipe.result_count
            }
            tr.find('.machine-count').html(Math.round(count * 1000) / 1000)
            var power = 0
            if (machine.energy_source && machine.energy_source.type == 'electric') {
                power = machine.energy_usage * count;
                calc.total_electric_power += power

            }
            tr.find('.machine-power').html(Math.round(power * 1000) / 1000 + ' kW')
            calc.total_pollution += machine.energy_usage * count * machine.energy_source.emissions;
            tr.find('.machine-pollution').html(Math.round(machine.energy_usage * count * machine.energy_source.emissions * 1000) / 1000)
        }
    }

}


var getUpstreamsRecursive = function (type, targetName, needs, quantities, max_depth) {
    if (typeof max_depth == 'undefined') max_depth = -1
    max_depth = Math.round(max_depth)
    if (max_depth == 0) {
        return quantities
    }
    max_depth--;
    var target;
    if (typeof targetName == 'string') {

        if (typeof type != 'undefined') {
            target = window[type + 's'][targetName]
        } else {
            target = recipes[targetName]
        }
    } else if (typeof targetName == 'object') {
        target = targetName
    }
    if (typeof target == 'undefined') {
        return quantities
    }

    if (type == 'technology') {
        if (typeof targetName == 'string' && typeof quantities[targetName] == 'undefined') {
            quantities = getUpstreamsRecursive('recipe', target, target.count, quantities, 1);
        }

        $.each(target.prerequisites, function (i, name) {
            if (typeof quantities[name] == 'undefined') {
                quantities[name] = {
                    type: 'technology',
                    value: 1
                }

                quantities = getUpstreamsRecursive('recipe', technologys[name], technologys[name].count, quantities, 1);
                quantities = getUpstreamsRecursive(type, name, 1, quantities, max_depth);

            }

        })

        return quantities

    } else if (target) {
        var ingredients = target.ingredients
    }


    $.each(ingredients, function (k, v) {

        if (typeof quantities[k] == 'undefined') {
            quantities[k] = {
                type: typeof resources[k] != 'undefined' ? 'resource' : type,
                value: 0
            };
        }
        var result_count = typeof target.result_count != 'undefined' ? target.result_count : 1
        quantity = v * needs / result_count;
        quantities[k].value += quantity;

        quantities = getUpstreamsRecursive(type, k, quantity, quantities, max_depth);
    })
    return quantities;
}

var getAssemblingSelector = function (name, val) {
    return getAssemblingSelectorEx(undefined, name, val)
}

var getAssemblingSelectorEx = function (type, name, val) {
    if (typeof type == 'undefined') {
        type = 'recipes'
    } else {
        type += 's'
    }
    var recipe = window[type][name]
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
    html = '<div class="icon" data-icon="' + items[val].icon + '">&nbsp;</div> <select class="select-assembling form-control" data-name="' + name + '">';

    $.each(categories[category], function (k, name) {
        if (machines[name].type == 'assembling-machine' && machines[name].ingredient_count < recipe.ingredient_count) return true
        html += '<option value="' + name + '"' + (val == name ? 'selected="selected"' : '') + ' class="translate" data-string="' + name + '">' + translate(name, true) + '</option>';
    })
    html += '</select>';
    return html;
}

var getTargetSelector = function (type, val) {
    if (typeof val == 'undefined') {
        val = 'player'
    }
    target_no++
    var html = '<div class="select-target" data-val="' + val + '" data-target-no="' + target_no +
        '"><a href="javascript:;" class="btn btn-default"><div class="icon icon-' + type + '" data-icon="' + getIcon(type, val) +
        '">&nbsp;</div> ' + translate(val) + '</a></div>'
    return html

}

var changeLanguage = function (language) {
    var _change = function () {
        currentLanguage = language;
        saveHash('language', language);
        $('.translate').each(function () {
            var $this = $(this)
            $this.html(translate($this.data('string'), true))
        })

        $('.translate-data').each(function () {
            var $this = $(this)
            $this.attr($this.data('translate-target'), translateEx($this.data('group'), $this.data('string'), true))
        })
    }
    if (typeof translations[language] != 'undefined') {
        _change();
    } else {
        $.ajax({
            url: 'translations/' + language + '.js?v=3',
            dataType: 'json',
            async: false,
            success: function (data) {
                translations[language] = data;
                _change()
            },
            error: function (data) {
                alert('load translations error')
            }
        })
    }
}

var hashes = {}
var requirementMachines = {}

var saveHashTimeout
var saveHash = function (name, value) {
    clearTimeout(saveHashTimeout)
    saveHashTimeout = setTimeout(function () {
        var str = ''
        if (typeof value != 'string') {
            var arr = []
            $.each(value, function (k, v) {
                arr.push(k + ':' + v)
            })
            str = arr.join(',')
        } else {
            str = value
        }
        hashes[name] = str
        var tmp = []
        $.each(hashes, function (k, v) {
            tmp.push(k + '=' + v)
        })
        window.location.hash = tmp.join('&')
    }, 100)
}

var loadHash = function () {
    var hashStr = window.location.hash.substring(1)
    if (!hashStr) return;
    var tmp = hashStr.split('&')
    $.each(tmp, function (i, v) {
        var hash = v.split('=')
        hashes[hash[0]] = hash[1]
    })
}

var loadLanguage = function () {

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

var loadTargetRequirement = function () {

    if (typeof hashes['targets'] != 'undefined' && hashes['targets'] != '') {
        var tbody = $('#tbody-target')
        tbody.html('')

        $.each(hashes['targets'].split(','), function (k, v) {
            if (!v) return true;
            var line = v.split(':')
            var target = line[0]
            var info = line[1].split(';')
            var machine = info[0]
            var needs = info[1]
            var type
            if (machine == 'lab') {
                type = 'technology'
            } else {
                type = 'recipe'
            }
            var row = $(getTargetRow(type, target))
            row.find('.input-amount').val(needs)
            row.attr('data-name', target)
            row.find('.td-assembling-select').html(getAssemblingSelectorEx(type, target)).find('.icon').each(getImage)
            row.find('.select-assembling').val(machine)
            row.attr('data-type', type)
            tbody.append(row)

        })
        tbody.find('.icon').each(getImage)
        var requirementsBak = hashes['requirements']
        render()

        if (typeof requirementsBak != 'undefined' && requirementsBak != '') {
            var tbody = $('#tbody-remainder')
            $.each(requirementsBak.split(','), function (k, v) {
                var line = v.split(':')
                var name = line[0]
                var machine = line[1]
                tbody.find('tr[data-name=' + name + '] .select-assembling').val(machine).change()
                requirementMachines[name] = machine
            })
        }
        calc.full(calcRequirements())
    }
}

var rawTranslate = function (groupName, key) {

    var append = ''
    do {
        var result
        $.each([currentLanguage, translateFallback], function (i, language) {
            switch (typeof translations[language][key]) {
            case 'string':
                result = translations[language][key]
                return false
            case 'object':
                if (typeof translations[language][key][groupName] != 'undefined') {
                    result = translations[language][key][groupName]
                    return false
                } else {
                    result = translations[language][key][Object.keys(translations[language][key])[0]]
                    return false
                }

            }

        })
        if (typeof result == 'string') {
            return result + append
        }

        var matches = key.match(/^(.*?)(-([^-]*))?$/)
        if (matches && matches[2]) {
            key = matches[1]
            append = ' ' + matches[3] + append
        } else {
            break
        }
    } while (true)
    console.log(groupName, key + append)
    return key + append;

}
var translate = function (key, is_raw) {
    return translateEx(undefined, key, is_raw)
}

var translateEx = function (group, key, is_raw) {
    if (typeof is_raw == 'undefined') {
        is_raw = false
    }
    if (is_raw) {
        return rawTranslate(group + '-name', key)
    } else {
        return '<span class="translate" data-string="' + key + '">' + rawTranslate(group + '-name', key) + '</span>'
    }
}

var initTargetSelector = function (force) {
    var modal = $('#modal-target-selector')
    var orders = {}

    var html = '<ul class="nav nav-tabs" role="tablist">'
    var panel = ''
    var actived = false
    $.each(groups, function (group_name, config) {
        var html_append = ''
        var panel_append = ''
        var is_append = false
        var icon = config.icon
        if (!icon) {
            icon = 'local/questionmark.png'
        }
        html_append += '<li role="presentation" class="target-selector-tabs' + (actived ? '' : ' active') + '"><a href="#selector-' + group_name +
            '" aria-controls="selector-' + group_name + '" role="tab" data-toggle="tab">' + '<img src="' + config.icon + '"/> ' + '</a></li>'
        panel_append += '<div role="tabpanel" class="tab-pane' + (actived ? '' : ' active') + '" id="selector-' + group_name + '"><div class="table">'
        $.each(config.subgroups, function (subgroup_name, order) {
            if (typeof subgroups[subgroup_name] == 'undefined') return true
            panel_append += '<div class="table-row">'
            var keys = []
            var to_appends = {}
            $.each(subgroups[subgroup_name], function (item_name, j) {
                var item
                if (subgroup_name.search('technology') < 0) {
                    item = items[item_name]
                    if (typeof recipes[item_name] != 'undefined') {
                        is_append = true
                    } else {
                        return true
                    }

                    if (typeof to_appends[item_name] == 'undefined') {
                        keys.push({ order: item.order, name: item_name })
                        to_appends[item_name] = ''
                    }
                    to_appends[item_name] += '<abbr class="translate-data" title="" data-translate-target="title" data-string="' + item_name +
                        '"><a href="javascript:;" class="select-this-target" data-name="' + item_name + '"><div class="icon" data-icon="' +
                        item.icon + '">&nbsp;</div></a></abbr>'


                } else {
                    item = technologys[item_name]
                    is_append = true

                    if (typeof to_appends[item_name] == 'undefined') {
                        keys.push({ order: item.order, name: item_name })
                        to_appends[item_name] = ''
                    }
                    to_appends[item_name] += '<abbr class="translate-data" title="" data-translate-target="title" data-group="technology" data-string="' +
                        item_name + '"><a href="javascript:;" class="select-this-target technology" data-name="' + item_name + '"><div class="icon icon-technology" data-icon="' +
                        item.icon + '">&nbsp;</div></a></abbr>'

                }

            })
            var f = String.fromCharCode(0)
            var sort = function (a, b) {
                if (a.order > b.order) {
                    return 1
                } else if (a.order < b.order) {
                    return -1
                } else {
                    var a_name = parseInt(a.name.replace(/^.*-/, ''))
                    var b_name = parseInt(b.name.replace(/^.*-/, ''))

                    if (a_name > b_name) {
                        return 1
                    } else if (a_name < b_name) {
                        return -1
                    }
                }
                return 0

            }
            keys.sort(sort)
            $.each(keys, function (l, order) {
                panel_append += to_appends[order.name]
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

    modal.find('.target-selector-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    modal.find('.select-this-target').click(function () {
        var $this = $(this)
        var val = $this.data('name')
        var el = $('#tbody-target .select-target[data-target-no=' + target_selecting + ']')
        var tr = el.closest('tr');
        el.data('val', val)
        var item, translation, class2x = '',
            assemblingSelector = ''
        if ($this.hasClass('technology')) {
            tr.attr('data-type', 'technology')
            item = technologys[val]
            translation = translateEx('technology', val)
            class2x = ' icon-technology'
            assemblingSelector = getAssemblingSelectorEx('technology', val)
        } else {
            tr.attr('data-type', 'recipe')
            item = items[val]
            translation = translate(val)
            assemblingSelector = getAssemblingSelector(val)
        }

        el.find('a').html('<div class="icon' + class2x + '" data-icon="' + item.icon + '">&nbsp;</div> ' + translation).find('.icon').each(getImage)

        tr.find('.td-assembling-select').html(assemblingSelector).find('.icon').each(getImage)
        tr.attr('data-name', val);
        modal.modal('hide')
        render()
    })
}

var getImage = function () {
    var el = $(this)
    var url = el.data('icon')
    if (typeof url == 'undefined' || !url) {
        url = 'local/bonus-icon.png'
    }
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
            $.each(imageLoading[url], function (i, el) {
                el.css('background-image', 'url(data:image/png;base64,' + dataURL + ')')
            })
            imageLoading[url] = null
        } else {
            $('<img src="' + url + '">').load(function () {
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
                $.each(imageLoading[url], function (i, el) {
                    el.css('background-image', 'url(' + dataURL + ')')
                })
                imageLoading[url] = null
            });
        }
    }
}

$('#tbody-target').on('click', '.select-target a', function () {
    target_selecting = $(this).parent().data('target-no')
    $('#modal-target-selector').modal('show')
})

$('#tbody-target').on('keyup keydown keypress DOMAttrModified propertychange change', '.input-amount', calcWithRequirements)


$('#add-row a').click(function () {
    var row = $(getTargetRow())
    $('#tbody-target').append(row).find('.icon').each(getImage)
    $('#table-material .row-fold').click()
    row.find('.select-target a').click()
})

$('#table-material').on('click', 'a.row-remove', function () {
    var tr = $(this).closest('tr')
    $('#table-material .row-fold').click()
    $(this).closest('tr').remove()
    render()
})

$('#table-material').on('click', 'a.row-expand', function () {
    var tr = $(this).closest('tr')
    var fullName = tr.data('name')
    var path = fullName.split(nameDelimiter)
    var name = path[path.length - 1]
    var requirements = {}
    var td = tr.find('.td-amount')
    var amount
    if (td.length) {
        amount = parseFloat(td.html())
    } else {
        amount = tr.find('.input-amount').val()
    }
    requirements = getUpstreamsRecursive(tr.data('type'), name, amount, requirements, 1)
    $('tr[data-name^=' + fullName + nameDelimiter + ']').remove()
    $.each(requirements, function (name, config) {
        var machine
        $('tr[data-name=' + name + ']').each(function () {
            var $this = $(this)
            machine = $this.find('.select-assembling').val()
            $this.find('a.row-fold').click()
            var td = $this.find('td.td-amount')
            var amount = td.html() - config.value
            if (Math.abs(amount) < 0.0001) {
                $this.remove()
            } else {
                calc.single(name, { type: config.type, value: amount })
            }
        })

        var row = $(generateRow({
            hasName: fullName + nameDelimiter + name,
            hasExpand: true,
            hasAssemble: getAssemblingSelectorEx(config.type, name, machine),
            hasAmount: config.value,
            hasTarget: '<div class="icon col-xs-offset-' + path.length + '" data-icon="' + getIcon(config.type, name) + '">&nbsp;</div> ' + translateEx(config.type, name)
        }))
        tr.after(row)
        calc.single(name, undefined, row)

    })
    $(this).replaceWith('<a class="btn btn-warning btn-mono row-fold">&lt;</a>')
    $('#table-material tr[data-name^=' + fullName + nameDelimiter + ']').find('.icon').each(getImage)

})

$('#table-material').on('click', 'a.row-fold', function () {
    var tr = $(this).closest('tr')
    var fullName = tr.data('name')

    var path = fullName.split(nameDelimiter)
    var name = path[path.length - 1]
    $('tr[data-name^=' + fullName + nameDelimiter + ']').each(function () {
        var $this = $(this)
        var path = $this.data('name').split(nameDelimiter)
        var name = path[path.length - 1]
        var row = $('tr[data-name=' + name + ']')
        if (row.length) {
            var td = row.find('.td-amount')
            td.html(parseFloat(td.html()) + parseFloat($this.find('.td-amount').html()))
            calc.single(name, undefined, row)
        } else {
            var type = $this.data('type')
            var newrow = $(generateRow({
                hasName: name,
                hasExpand: true,
                hasAssemble: getAssemblingSelectorEx(type, name, $this.find('.select-assembling').val()),
                hasAmount: $this.find('.td-amount').html(),
                hasTarget: '<div class="icon" data-icon="' + getIcon(type, name) + '">&nbsp;</div> ' + translateEx(type, name)
            }))
            $('#tbody-remainder').append(newrow)
            newrow.find('.icon').each(getImage)
            calc.single(name, undefined, newrow)

        }
        $this.remove()
    })
    $(this).replaceWith('<a class="btn btn-info btn-mono row-expand">&gt;</a>')

})


$('#select-translate').change(function () {
    changeLanguage($(this).val())
})

$('#container').on('change', '.select-assembling', function () {
    var $this = $(this)
    $this.siblings('.icon').data('icon', items[$this.val()].icon).each(getImage)
    var tr = $this.closest('tr')
    var path = tr.data('name').split(nameDelimiter)
    var name = path[path.length - 1]
    calc.single(name, undefined, tr)
})

$('#select-all-assembling').change(function () {
    var val = $(this).val()
    $('select.select-assembling option[value=' + val + ']').parent().val(val).change()
})

$('#button-show-demo').click(function () {
    var name = $('#select-demo').val()
    if (!demos[name]) {
        $.ajax({
            url: name + '.js',
            dataType: 'text',
            success: function (data) {
                demos[name] = data
                $('#textarea-demo').val(data).show()
            }
        })
    } else {
        $('#textarea-demo').val(demos[name])
    }
})

$('#submit-alter-data').click(function () {
    $('#modal-alter-data').modal('hide')
    var alters = eval('(' + $('#textarea-alter-data').val() + ')')
    $.each(alters, function (alter, datas) {
        $.each(datas, function (name, data) {
            window[alter][name] = data
        })
    })
    initTargetSelector(true)
    changeLanguage(currentLanguage)

})

$('#rebuild-icon').click(function () {
    window.localStorage.clear()
    $('.icon').each(getImage)
})

$(function () {
    loadHash()

    loadLanguage()
    loadTargetRequirement()
    initTargetSelector(false)

    $('#select-all-assembling').html(function(){

        $.each(machines, function (name) {
            html += '<option value="' + name + '"' + 'class="translate" data-string="' + name + '">' + translate(name, true) + '</option>';
        })
        return html;
    })

    var html = '';

    $.each(languages, function (k, v) {
        html += '<option value="' + v + '">' + v + '</option>'
    })
    $('#select-translate').html(html)
    $('#select-translate').val(currentLanguage)
    changeLanguage(currentLanguage)
})
