/*@cc_on
  // conditional IE < 9 only fix
  @if (@_jscript_version <= 9)
  (function(f){
     window.setTimeout=f(window.setTimeout);
     window.setInterval=f(window.setInterval);
  })(function(f){return function(c,t){var a=[].slice.call(arguments,2);return f(function(){c instanceof Function?c.apply(this,a):eval(c)},t)}});
  @end
@*/

var imageLoading = {};
var translations = [];
var translateFallback, currentLanguage;
var target_selecting;
var target_no = 0;
var demos = [];
var nameDelimiter = '-_-';
var requirements = {};
var inserterOrders = [];
var inserterTds = '';

var sortByOrder = function (a, b) {
    if (a.order > b.order) {
        return 1;
    } else if (a.order < b.order) {
        return -1;
    } else {
        var a_name = parseInt(a.name.replace(/^.*-/, ''));
        var b_name = parseInt(b.name.replace(/^.*-/, ''));

        if (a_name > b_name) {
            return 1;
        } else if (a_name < b_name) {
            return -1;
        }
    }
    return 0;

};


var calcRequirements = function (max_depth) {
    var saves = [];
    var html = '';
    var requirements = {};
    $('#tbody-target tr.target').each(function () {
        var $this = $(this);
        var target = $this.find('.select-target').data('val');
        var recipe = recipes[target]
        requirements[target] = {
            ratio: typeof recipe == 'undefined' ? 1 : 1 / recipes[target].result_count,
            // type:
            isBeExpanded: false,
            expanded: false,
            recipe: typeof recipe == 'undefined' ? {} : recipes[target],
            value: 1,
            root: true
        };
        requirements[target].sub = getUpstreamsRecursive($this.data('type'), target, requirements[target], max_depth);

    });
    return requirements;
};

var getTarget = function (type, name) {
    if (typeof type != 'undefined') {
        if (typeof window[type + 's'][name] != 'undefined') {
            return window[type + 's'][name];
        }
    }
    return items[name];
};

var getIcon = function (type, name) {
    var target = getTarget(type, name);
    if(typeof target == 'undefined') {
        return
    }
    if (typeof target.icon != 'undefined') {
        return target.icon;
    } else {
        return getTarget('item', name).icon;
    }
};

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
};

var getTargetRow = function (type, val) {
    return generateRow({
        hasClass: 'success target',
        isBase: true,
        hasTarget: getTargetSelector(type, val),
        hasAmountInput: true,
        hasRemove: true,
        hasExpand: true
    });
};

var generateRow = function (user_config) {
    // console.trace()
    var config = {
        hasClass: false,
        hasName: false,
        isBase: false,
        hasType: false,
        hasRemove: false,
        hasExpand: true,
        hasAmountInput: false,
        hasAmount: false,
        hasTarget: false,
        hasAssemble: false
    };
    $.each(user_config, function (k, v) {
        config[k] = v;
    });
    return '<tr' + (config.hasClass ? ' class="' + config.hasClass + '"' : '') + (config.hasName ? ' data-name="' + config.hasName + '"' : '') + (config.hasType ?
            ' data-type="' + config.hasType + '"' : '') + '><td rowspan="2">' +
        (config.hasRemove ? '<a class="btn btn-danger btn-mono row-remove">-</a>' : '') + (config.hasExpand ?
            '<a class="btn btn-info btn-mono row-expand">&gt;</a>' : '') +
        '</td><td rowspan="2">' + config.hasTarget + '</td>' +
        '<td rowspan="2"' + (config.hasAmountInput ? '' : ' class="td-amount"') + '>' + (config.hasAmountInput ?
            '<input type="text" class="form-control input-amount" value="1" />' : '') + (config.hasAmount !== false ? config.hasAmount : '') + '</td>' +
        '<td rowspan="2" class="td-assembling-select">' + config.hasAssemble + '</td>' +
        '<td rowspan="2" class="machine-count"></td><td rowspan="2" class="machine-power"></td><td rowspan="2" class="machine-pollution"></td>' +
        getInserterTds(config.isBase) + '</tr><tr>' + (config.isBase ? '' : getInserterTds(config.isBase)) + '</tr>';
};

var calcTimeout;
var calcWithRequirements = function () {
    clearTimeout(calcTimeout);
    calcTimeout = setTimeout(function () {
        render.full();
    }, 100);

};

var render = {
    render: function () {
        requirements = calcRequirements();
        var html = $();
        render.remainder = {};

        $.each(requirements, function (target, config) {
            $('#tbody-target tr[data-name=' + target + ']').data('config', config);

        });

        render.remainderVersion = 0;
        render.full();
    },

    init: function () {
        render.total_electric_power = 0;
        render.total_pollution = 0;


        render.saves = {};
        return render;
    },

    calcRecursive: function (name, config, needs) {
        var value = needs * config.ratio;

        if (!config.root) {
            if (typeof render.remainder[name] == 'undefined') {
                render.remainder[name] = {
                    value: 0,
                    recipe: config.recipe,
                    version: render.remainderVersion,
                    sub: getUpstreamsRecursive(config.type, name, config),
                    ratio: 1 / (typeof recipes[name] != 'undefined' ? recipes[name].result_count : 1)
                };
            }
            if (render.remainder[name].version != render.remainderVersion) {
                render.remainder[name].version = render.remainderVersion;
                render.remainder[name].value = 0;
            }
            if (!config.isBeExpanded) {
                render.remainder[name].value += value;
            }

        }
        config.value = value;

        $.each(config.sub, function (k, v) {
            render.calcRecursive(k, v, value);
        });
    },

    calcRemainder: function () {
        var recursive = function (name, config, needs) {
            var value = needs * config.ratio;

            if (config.isBeExpanded) {
                render.remainder[name].value -= value;
            }
            config.value = value;
            $.each(config.sub, function (k, v) {
                recursive(k, v, value);

            });
        };

        $.each(render.remainder, function (k, v) {
            // trick
            recursive(k, v, v.value / v.ratio);
        });
    },

    full: function () {
        render.init();
        render.remainderVersion++;

        $('#tbody-target tr.target').each(function () {
            var $this = $(this);
            var target = $this.find('.select-target').data('val');
            var needs = $this.find('.input-amount').val();
            render.calcRecursive(target, requirements[target], needs);
            render.saves[target] = $this.find('.select-assembling').val() + ';' + needs;
        });


        saveHash('targets', render.saves);

        var html = $();
        if (render.remainderVersion == 1) {

            $.each(render.remainder, function (name, config) {
                var row = $(generateRow({
                    hasClass: 'base',
                    isBase: true,
                    hasName: name,
                    hasExpand: true,
                    hasAssemble: getAssemblingSelectorEx(config.type, name),
                    hasAmount: config.value,
                    hasTarget: '<div class="icon" data-icon="' + getIcon(config.type, name) +
                        '">&nbsp;</div> ' + translateEx(config.type, name)
                }));

                row.data('config', config);
                html = html.add(row);
            });

            $('#tbody-remainder').html(html).find('.icon').each(getImage);
        }
        render.calcRemainder();


        $('#tbody-target tr.target,#tbody-remainder tr.base').each(function () {
            render.single($(this));
        });

        render.saves = {};


        $('.total-power').html(Math.ceil(render.total_electric_power * 100) / 100 + ' kW');
        $('.total-pollution').html(Math.ceil(render.total_pollution * 100) / 100);
    },

    single: function (tr) {

        var value;

        var name = tr.data('name');

        config = tr.data('config');
        value = config.value;
        if (value == 0 && tr.closest('tbody').attr('id') == 'tbody-remainder') {
            tr.hide();
            tr.next().hide();
            return;
        } else {
            tr.show();
            tr.next().show();
        }

        var machine_name = tr.find('.select-assembling').val();
        var machine = machines[machine_name];
        if (machine) {
            render.saves[name] = machine_name;
            requirementMachines[name] = machine_name;

            saveHash('requirements', render.saves);
        }
        if (config) {
            tr.find('.td-amount').html(Math.ceil(value * 100) / 100);
        }

        if (typeof machine == 'undefined') {
            tr.find('.machine-count').html('');
            tr.find('.machine-power').html('');
            tr.find('.machine-pollution').html('');
        } else {

            if (machine.type == 'mining-drill') {
                var resource = resources[name];
                var count = value / 60 * resource.mining_time / machine.mining_speed / (machine.mining_power - resource.hardness);
            } else if (machine.type == 'lab') {
                var technology = technologys[name];

                var count = value / 60 * technology.time * technology.count;
                console.log(count)
            } else {
                var recipe = recipes[name];
                config.batchTime = recipe.energy_required / machine.crafting_speed;

                var count = value / 60 * config.batchTime / recipe.result_count;

            }
            if (typeof recipe != 'undefined' && (typeof recipe.type == 'undefined' || recipe.type != 'fluid')) {
                $.each(inserterOrders, function (i, inserterConfig) {
                    if (typeof config.batchTime != 'undefined') {
                        var inserterName = inserterConfig.name;
                        var inserterCount = Math.ceil(recipe.result_count * 60 / config.batchTime / inserters[inserterName].turns_per_minute *
                            100) / 100;
                        tr.find('.inserter-' + inserterName).html(inserterCount);
                    }
                })
            }
            if (typeof config.parent != 'undefined' && typeof config.parent.recipe != 'undefined') {
                $.each(inserterOrders, function (i, inserterConfig) {
                    var parent = config.parent;
                    var inserterName = inserterConfig.name;
                    var inserterCount = Math.ceil(parent.recipe.ingredients[name] * 60 / parent.batchTime / inserters[inserterName].turns_per_minute *
                        100) / 100;
                    tr.next().find('.inserter-' + inserterName).html(inserterCount);
                });
            }

            tr.find('.machine-count').html(Math.ceil(count * 100) / 100);

            var power = 0;
            if (machine.energy_source && machine.energy_source.type == 'electric') {
                power = machine.energy_usage * count;
                render.total_electric_power += power;

            }
            tr.find('.machine-power').html(Math.ceil(power * 100) / 100 + ' kW');
            render.total_pollution += machine.energy_usage * count * machine.energy_source.emissions;
            tr.find('.machine-pollution').html(Math.ceil(machine.energy_usage * count * machine.energy_source.emissions * 100) / 100);

            if (config.expanded) {
                tr.data('sub').each(function () {
                    render.single($(this))
                })
            }
        }
    }

};


var getUpstreamsRecursive = function (type, targetName, parent, max_depth) {
    var quantities = {};
    if (typeof max_depth == 'undefined') max_depth = -1;
    max_depth = Math.ceil(max_depth);
    if (max_depth == 0) {
        return quantities;
    }
    max_depth--;
    var target;
    if (typeof targetName == 'string') {

        if (typeof type != 'undefined') {
            target = window[type + 's'][targetName];
        } else {
            target = recipes[targetName];
        }
    } else if (typeof targetName == 'object') {
        target = targetName;
    }
    if (typeof target == 'undefined') {
        return quantities;
    }

    if (type == 'technology') {
        if (typeof targetName == 'string' && typeof quantities[targetName] == 'undefined') {
            // quantities = getUpstreamsRecursive('recipe', target,  1);

            quantities = getUpstreamsRecursive('recipe', target, {}, 1);
        }

        $.each(target.prerequisites, function (i, name) {
            if (typeof quantities[name] == 'undefined') {
                quantities[name] = {
                    type: 'technology',
                }

                quantities[name].sub = getUpstreamsRecursive('recipe', technologys[name], quantities[name], 1);
                quantities[name].sub = getUpstreamsRecursive(type, name, quantities[name], max_depth);

            }

        })

        return quantities

    }

    if (target) {
        var ingredients = target.ingredients;
    }


    $.each(ingredients, function (k, v) {
        quantities[k] = {
            type: typeof resources[k] != 'undefined' ? 'resource' : type,
            ratio: v / target.result_count,
            sub: {},
            isBeExpanded: false,
            expanded: false,
            parent: parent,
            recipe: typeof recipes[k] != 'undefined' ? recipes[k] : {}
        };

        quantities[k].sub = getUpstreamsRecursive(type, k, quantities[k], max_depth);

    });
    return quantities;
};

var getAssemblingSelector = function (name, val) {
    return getAssemblingSelectorEx(undefined, name, val);
};

var getAssemblingSelectorEx = function (type, name, val) {
    if (typeof type == 'undefined') {
        type = 'recipes';
    } else {
        type += 's';
    }
    var recipe = window[type][name];
    if (typeof recipe == 'undefined' || typeof categories[recipe.category] == 'undefined') {
        if (typeof resources[name] != 'undefined') {
            category = resources[name].category;
        } else {
            return '';
        }
    } else {
        category = recipe.category;
    }
    if (typeof val == 'undefined') {
        if (typeof requirementMachines[name] != 'undefined') {
            val = requirementMachines[name];
        } else {
            val = categories[category][0];
        }
    }
    var html = '<div class="icon" data-icon="' + items[val].icon + '">&nbsp;</div> <select class="select-assembling form-control" data-name="' + name +
        '">';

    $.each(categories[category], function (k, name) {
        if (machines[name].type == 'assembling-machine' && machines[name].ingredient_count < recipe.ingredient_count) return true;
        html += '<option value="' + name + '"' + (val == name ? 'selected="selected"' : '') + ' class="translate" data-string="' + name + '">' +
            translate(name, true) + '</option>';
    });
    html += '</select>';
    return html;
};

var getTargetSelector = function (type, val) {
    if (typeof val == 'undefined') {
        val = 'player';
    }
    target_no++;
    var html = '<div class="select-target" data-val="' + val + '" data-target-no="' + target_no +
        '"><a href="javascript:;" class="btn btn-default"><div class="icon icon-' + type + '" data-icon="' + getIcon(type, val) +
        '">&nbsp;</div> ' + translate(val) + '</a></div>';
    return html;

};

var changeLanguage = function (language) {
    var _change = function () {
        currentLanguage = language;
        saveHash('language', language);
        $('.translate').each(function () {
            var $this = $(this);
            $this.html(translate($this.data('string'), true));
        });

        $('.translate-data').each(function () {
            var $this = $(this);
            $this.attr($this.data('translate-target'), translateEx($this.data('group'), $this.data('string'), true));
        });
    };
    if (typeof translations[language] != 'undefined') {
        console.log(translations[language])
        _change();
    } else {
        $('body').append('<script src="translations/'+language+'.js"></script>')
    }
};

var hashes = {};
var requirementMachines = {};

var saveHashTimeout;
var saveHashData = {};
var saveHash = function (name, value) {
    clearTimeout(saveHashTimeout);
    //clone
    if (typeof value == 'object') {
        value = $.extend(true, {}, value);
    }
    saveHashData[name] = value;

    saveHashTimeout = setTimeout(function () {
        $.each(saveHashData, function (name, value) {
            var str = '';
            if (typeof value != 'string') {
                var arr = [];
                $.each(value, function (k, v) {
                    arr.push(k + ':' + v);
                });
                str = arr.join(',');
            } else {
                str = value;
            }
            hashes[name] = str;
            delete(saveHashData[name]);
        });
        var tmp = [];
        $.each(hashes, function (k, v) {
            tmp.push(k + '=' + v);
        });
        window.location.hash = tmp.join('&');
    }, 100);

};

var loadHash = function () {
    var hashStr = window.location.hash.substring(1);
    if (!hashStr) return;
    var tmp = hashStr.split('&');
    $.each(tmp, function (i, v) {
        var hash = v.split('=');
        hashes[hash[0]] = hash[1];
    });
};

var loadLanguage = function () {

    if (typeof translateFallback == 'undefined') {
        translateFallback = 'en';
    }
    if (typeof currentLanguage == 'undefined') {
        if (typeof hashes.language != 'undefined') {
            currentLanguage = hashes.language;
        } else {
            var testLanguage = navigator.language || navigator.userLanguage;
            if (languages.indexOf(testLanguage) < 0) {
                currentLanguage = translateFallback;
            } else {
                currentLanguage = testLanguage;
            }
        }
    }
    var currentLanguageBak = currentLanguage;

    changeLanguage(translateFallback);
    changeLanguage(currentLanguageBak);
};

var loadTargetRequirement = function () {

    if (typeof hashes.targets != 'undefined' && hashes.targets != '') {
        var tbody = $('#tbody-target');
        tbody.html('');

        $.each(hashes.targets.split(','), function (k, v) {
            if (!v) return true;
            var line = v.split(':');
            var target = line[0];
            var info = line[1].split(';');
            var machine = info[0];
            var needs = info[1];
            var type;
            if (machine == 'lab') {
                type = 'technology';
            } else {
                type = 'recipe';
            }
            var row = $(getTargetRow(type, target));
            row.find('.input-amount').val(needs);
            row.attr('data-name', target);
            row.find('.td-assembling-select').html(getAssemblingSelectorEx(type, target)).find('.icon').each(getImage);
            row.find('.select-assembling').val(machine);
            row.attr('data-type', type);
            tbody.append(row);

        });
        tbody.find('.icon').each(getImage);
        var requirementsBak = hashes.requirements;
        render.render();

        if (typeof requirementsBak != 'undefined' && requirementsBak != '') {
            var tbody = $('#tbody-remainder');
            $.each(requirementsBak.split(','), function (k, v) {
                var line = v.split(':');
                var name = line[0];
                var machine = line[1];
                tbody.find('tr[data-name=' + name + '] .select-assembling').val(machine).change();
                requirementMachines[name] = machine;
            });
        }
        render.full();
    }
};

var loadInserters = function () {
    $.each(inserters, function (k, v) {
        var item = items[k];
        inserterOrders.push({ order: item.order, name: k });
    });

    inserterOrders.sort(sortByOrder);
    var html = '';
    $.each(inserterOrders, function (k, config) {
        inserterTds += '<td class="inserter-' + config.name + '"></td>';
        html += '<td><div class="icon" data-icon="' + items[config.name].icon + '">&nbsp;</div></td>';
    });
    var obj = $(html);
    $('#table-material thead td.inserter').replaceWith(obj);
    obj.find('.icon').each(getImage);
};

var getInserterTds = function (rowspan) {
    if (rowspan) {
        return inserterTds.replace(/<td/g, '<td rowspan="2"')
    } else {
        return inserterTds
    }
}


var rawTranslate = function (groupName, key) {

    var append = '';
    do {
        var result;
        $.each([currentLanguage, translateFallback], function (i, language) {
            switch (typeof translations[language][key]) {
            case 'string':
                result = translations[language][key];
                return false;
            case 'object':
                if (typeof translations[language][key][groupName] != 'undefined') {
                    result = translations[language][key][groupName];
                    return false;
                } else {
                    result = translations[language][key][Object.keys(translations[language][key])[0]];
                    return false;
                }

            }

        });
        if (typeof result == 'string') {
            return result + append;
        }

        var matches = key.match(/^(.*?)(-([^\-]*))?$/);
        if (matches && matches[2]) {
            key = matches[1];
            append = ' ' + matches[3] + append;
        } else {
            break;
        }
    } while (true);
    console.log(groupName, key + append);
    return key + append;

};
var translate = function (key, is_raw) {
    return translateEx(undefined, key, is_raw);
};

var translateEx = function (group, key, is_raw) {
    if (typeof is_raw == 'undefined') {
        is_raw = false;
    }
    if (is_raw) {
        return rawTranslate(group + '-name', key);
    } else {
        return '<span class="translate" data-string="' + key + '">' + rawTranslate(group + '-name', key) + '</span>';
    }
};

var initTargetSelector = function (force) {
    var modal = $('#modal-target-selector');
    var orders = {};

    var html = '<ul class="nav nav-tabs" role="tablist">';
    var panel = '';
    var actived = false;
    var groupKeys = []
    $.each(groups, function (group_name, config) {
        groupKeys.push({ order: config.order, name: group_name });
    })
    groupKeys.sort(sortByOrder);

    $.each(groupKeys, function (i, orderConfig) {
        var group_name = orderConfig.name
        var config = groups[group_name]
        var html_append = '';
        var panel_append = '';
        var is_append = false;
        var icon = config.icon;
        if (!icon) {
            icon = 'local/questionmark.png';
        }
        html_append += '<li role="presentation" class="target-selector-tabs' + (actived ? '' : ' active') + '"><a href="#selector-' + group_name +
            '" aria-controls="selector-' + group_name + '" role="tab" data-toggle="tab">' + '<img src="' + config.icon + '"/> ' + '</a></li>';
        panel_append += '<div role="tabpanel" class="tab-pane' + (actived ? '' : ' active') + '" id="selector-' + group_name +
            '"><div class="table">';
        $.each(config.subgroups, function (subgroup_name, order) {
            if (typeof subgroups[subgroup_name] == 'undefined') return true;
            panel_append += '<div class="table-row">';
            var keys = [];
            var to_appends = {};
            $.each(subgroups[subgroup_name], function (item_name, j) {
                var item;
                if (subgroup_name.search('technology') < 0) {
                    item = items[item_name];
                    if(typeof item == 'undefined') return true
                    if (typeof recipes[item_name] != 'undefined') {
                        is_append = true;
                    } else {
                        return true;
                    }

                    if (typeof to_appends[item_name] == 'undefined') {

                        keys.push({ order: item.order, name: item_name });
                        to_appends[item_name] = '';
                    }
                    to_appends[item_name] += '<abbr class="translate-data" title="" data-translate-target="title" data-string="' +
                        item_name +
                        '"><a href="javascript:;" class="select-this-target" data-name="' + item_name +
                        '"><div class="icon" data-icon="' +
                        item.icon + '">&nbsp;</div></a></abbr>';


                } else {
                    item = technologys[item_name];
                    is_append = true;

                    if (typeof to_appends[item_name] == 'undefined') {
                        keys.push({ order: item.order, name: item_name });
                        to_appends[item_name] = '';
                    }
                    to_appends[item_name] +=
                        '<abbr class="translate-data" title="" data-translate-target="title" data-group="technology" data-string="' +
                        item_name + '"><a href="javascript:;" class="select-this-target technology" data-name="' + item_name +
                        '"><div class="icon icon-technology" data-icon="' +
                        item.icon + '">&nbsp;</div></a></abbr>';

                }

            });
            var f = String.fromCharCode(0);

            keys.sort(sortByOrder);
            $.each(keys, function (l, order) {
                panel_append += to_appends[order.name];
            });
            panel_append += '</div>';
        });
        panel_append += '</div></div>';
        if (is_append) {
            html += html_append;
            panel += panel_append;
            actived = true;
        }
    });
    html += '</ul><div class="tab-content">' + panel + '</div></div>';
    modal.find('.modal-body').html(html);
    modal.find('.icon').each(getImage);

    modal.find('.target-selector-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    modal.find('.select-this-target').click(function () {
        var $this = $(this);
        var val = $this.data('name');
        if ($('#tbody-target tr[data-name=' + val + ']').length) {
            return false;
        }
        var el = $('#tbody-target .select-target[data-target-no=' + target_selecting + ']');
        var tr = el.closest('tr');
        el.data('val', val);
        var item, translation, class2x = '',
            assemblingSelector = '';
        if ($this.hasClass('technology')) {
            tr.attr('data-type', 'technology');
            item = technologys[val];
            translation = translateEx('technology', val);
            class2x = ' icon-technology';
            assemblingSelector = getAssemblingSelectorEx('technology', val);
        } else {
            tr.attr('data-type', 'recipe');
            item = items[val];
            translation = translate(val);
            assemblingSelector = getAssemblingSelector(val);
        }

        el.find('a').html('<div class="icon' + class2x + '" data-icon="' + item.icon + '">&nbsp;</div> ' + translation).find('.icon').each(getImage);

        tr.find('.td-assembling-select').html(assemblingSelector).find('.icon').each(getImage);
        tr.attr('data-name', val);
        modal.modal('hide');
        render.render();
    });
};


var getImage = function () {
    var el = $(this);
    var url = el.data('icon');
    if (typeof url == 'undefined' || !url) {
        url = 'local/bonus-icon.png';
    }
    if (imageLoading[url]) {
        imageLoading[url].push(el);
        return;
    } else {
        imageLoading[url] = [el];
    }
    if (window.localStorage && window.localStorage.getItem) {
        var compressed = window.localStorage.getItem('icon-' + url);
        var dataURL;
        if (compressed) {
            dataURL = Base64String.decompress(compressed);
        }
        if (dataURL && dataURL.substring(0, 22) != 'data:image/png;base64,') {
            $.each(imageLoading[url], function (i, el) {
                el.css('background-image', 'url(data:image/png;base64,' + dataURL + ')');
            });
            imageLoading[url] = null;
        } else {
            $('<img src="' + url + '">').load(function () {
                var img = $(this)[0];
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL("image/png");
                try {
                    window.localStorage.setItem('icon-' + url, Base64String.compress(dataURL.substring(22)));
                } catch (e) {
                    storage.clear();
                }
                $.each(imageLoading[url], function (i, el) {
                    el.css('background-image', 'url(' + dataURL + ')');
                });
                imageLoading[url] = null;
            });
        }
    }
};

$('#tbody-target').on('click', '.select-target a', function () {
    target_selecting = $(this).parent().data('target-no');
    $('#modal-target-selector').modal('show');
});

$('#tbody-target').on('keyup keydown keypress DOMAttrModified propertychange change', '.input-amount', calcWithRequirements);


$('#add-row a').click(function () {
    var row = $(getTargetRow());
    $('#tbody-target').append(row).find('.icon').each(getImage);
    $('#table-material .row-fold').click();
    row.find('.select-target a').click();
});


$('#table-material').on('click', 'a.row-remove', function () {
    var tr = $(this).closest('tr');
    $('#table-material .row-fold').click();
    $(this).closest('tr').remove();
    render.render();
});

var calcFullTimer;

$('#table-material').on('click', 'a.row-expand', function () {
    var tr = $(this).closest('tr');
    var name = tr.data('name');
    var config = {};
    var td = tr.find('.td-amount');
    var offset = tr.data('offset');
    if (typeof offset == 'undefined') {
        tr.data(offset, 0);
        offset = 0;
    }
    offset++;
    var amount;
    if (td.length) {
        amount = parseFloat(td.html());
    } else {
        amount = tr.find('.input-amount').val();
    }
    config = tr.data('config');
    config.expanded = true;
    render.remainderVersion++;
    render.calcRecursive(name, config, amount);

    var rows = $();

    $.each(config.sub, function (name, config) {
        var machine;

        var row = $(generateRow({
            hasName: name,
            hasExpand: true,
            hasAssemble: getAssemblingSelectorEx(config.type, name, machine),
            hasAmount: config.value,
            hasTarget: '<div class="icon col-xs-offset-' + offset + '" data-icon="' + getIcon(config.type, name) +
                '">&nbsp;</div> ' + translateEx(config.type, name)
        }));
        config.isBeExpanded = true;
        row.data({
            config: config,
            parent: tr,
            offset: offset
        }).find('.icon').each(getImage);
        tr.next().after(row);
        rows = rows.add(row);

    });
    tr.data('sub', rows);
    $(this).replaceWith('<a class="btn btn-warning btn-mono row-fold">&lt;</a>');

    clearTimeout(calcFullTimer);
    calcFullTimer = setTimeout(render.full, 100);

});


$('#table-material').on('click', 'a.row-fold', function () {
    var tr = $(this).closest('tr');
    tr.data('config').expanded = false;

    tr.data('sub').each(function () {
        var $this = $(this);
        $this.find('a.row-fold').click();
        $this.data('config').isBeExpanded = false;
        $this.remove();
    });
    $(this).replaceWith('<a class="btn btn-info btn-mono row-expand">&gt;</a>');

    clearTimeout(calcFullTimer);
    calcFullTimer = setTimeout(render.full, 100);

});


$('#select-translate').change(function () {
    changeLanguage($(this).val());
});

$('#container').on('change', '.select-assembling', function () {
    var $this = $(this);
    $this.siblings('.icon').data('icon', items[$this.val()].icon).each(getImage);
    var tr = $this.closest('tr');
    if(tr.hasClass('target')) {
        render.full()
    } else {
        var path = tr.data('name').split(nameDelimiter);
        var name = path[path.length - 1];
        render.single(tr);

    }
});

$('#select-all-assembling').change(function () {
    var val = $(this).val();
    $('select.select-assembling option[value=' + val + ']').parent().val(val).change();
});

$('#button-show-demo').click(function () {
    var name = $('#select-demo').val();
    if (!demos[name]) {
        $.ajax({
            url: name + '.js',
            dataType: 'text',
            success: function (data) {
                demos[name] = data;
                $('#textarea-demo').val(data).show();
            }
        });
    } else {
        $('#textarea-demo').val(demos[name]);
    }
});

$('#submit-alter-data').click(function () {
    $('#modal-alter-data').modal('hide');
    var alters = eval('(' + $('#textarea-alter-data').val() + ')');
    $.each(alters, function (alter, datas) {
        $.each(datas, function (name, data) {
            window[alter][name] = data;
        });
    });
    initTargetSelector(true);
    changeLanguage(currentLanguage);

});

$('#rebuild-icon').click(function () {
    window.localStorage.clear();
    $('.icon').each(getImage);
});

$(function () {
    loadHash();

    loadLanguage();
    loadInserters();
    loadTargetRequirement();
    initTargetSelector(false);

    $('#select-all-assembling').html(function () {

        $.each(machines, function (name) {
            html += '<option value="' + name + '"' + 'class="translate" data-string="' + name + '">' + translate(name, true) +
                '</option>';
        });
        return html;
    });

    var html = '';

    $.each(languages, function (k, v) {
        html += '<option value="' + v + '">' + v + '</option>';
    });
    $('#select-translate').html(html);
    $('#select-translate').val(currentLanguage);
    changeLanguage(currentLanguage);
});
