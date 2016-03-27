var calcRequirements = function(rendering) {
    var requirements = {}
    var html = ''
    $('#thead-target').children().each(function() {
        var $this = $(this)
        var target = $this.find('.select-target').val()
        var needs = $this.find('.input-amount').val()
        if (!rendering && typeof items[target].capacities != 'undefined') {

            var item = items[target]
            $.each(item.capacities, function(k, v) {
                html += '<tr class="warning" data-id="' + v.name + '">';
                html += '<td></td><td>' + translate(v.name) + '</td><td class="td-amount"></td><td>' + translate(item.id) + '</td><td class="factory-count"></td><td class="factory-power"></td><td class="factory-pollution"></td>';
                html += '</tr>';

            })
        }
        $('#thead-sub-production').html(html).toggle(html != '')
        requirements = getUpstreamsRecursive(target, needs, requirements, rendering)

    })
    return requirements;
}

var render = function() {
    var requirements = calcRequirements(true)
    var html = ''
    $.each(requirements, function(k, v) {
        var material = items[k];
        html += '<tr data-id="' + k + '">';
        html += '<td></td><td>' + translate(k) + '</td><td class="td-amount"></td><td>' + getAssemblingSelector(k) + '</td><td class="factory-count"></td><td class="factory-power"></td><td class="factory-pollution"></td>';
        html += '</tr>';
    })
    $('#table-material tbody').html(html)
    calc()

}
var getTargetRow = function() {
    return '<tr class="success">' +
        '<td class="row-remove"><button class="btn btn-danger">-</button></td><td>' + getTargetSelector() + '</td><td><input type="text" class="form-control input-amount" value="1"></td><td class="td-assembling-select"></td><td class="factory-count"></td><td class="factory-power"></td><td class="factory-pollution"></td>' +
        '</tr>'
}

var calc = function() {
    var requirements = calcRequirements(false)
    var electric_power = 0;
    var pollution = 0;

    var _calc = function(k, v) {

        var tr = $('tr[data-id=' + k + ']');
        var factory = factories[tr.find('.select-assembling').val()]
        tr.find('.td-amount').html(Math.round(v * 1000) / 1000)

        if (typeof factory == 'undefined') {
            tr.find('.factory-count').html('')
            tr.find('.factory-power').html('')
            tr.find('.factory-pollution').html('')
        } else {
            if (factory.type == 'mining-drill') {
                var count = v / 60 / factory.mining_speed / (factory.mining_power - items[k].hardness)
            } else {
                var count = v / 60 / factory.speed * items[k].time

            }
            tr.find('.factory-count').html(Math.round(count * 1000) / 1000)
            electric_power += factory.electric_power * count;
            tr.find('.factory-power').html(Math.round(factory.electric_power * count * 1000) / 1000 + ' kW')
            pollution += factory.pollution * count;
            tr.find('.factory-pollution').html(Math.round(factory.pollution * count * 1000) / 1000)
        }
    }


    $.each(requirements, _calc)

    $('#thead-target').children().each(function() {
        var $this = $(this)
        var target = $this.find('.select-target').val()
        var needs = $this.find('.input-amount').val()
        _calc(target, needs)

    })

    $('.total-power').html(Math.round(electric_power * 1000) / 1000 + ' kW')
    $('.total-pollution').html(Math.round(pollution * 1000) / 1000)



}


var getUpstreamsRecursive = function(id, needs, quantities, rendering) {
    var material = items[id]
    var subMaterials = material.materials

    var show_resource = $('#show-resource').is(':checked')
    $.each(subMaterials, function(k, v) {

        subMaterial = items[k];
        if (!show_resource && subMaterial.is_resource) {
            return true;
        }
        if (typeof quantities[k] == 'undefined') {
            quantities[k] = 0;
        }
        if(typeof subMaterial == 'undefined') {
            console.log(material.id);
        }
        quantity = v * needs / subMaterial.capacity / material.capacity;
        quantities[k] += quantity;

        quantities = getUpstreamsRecursive(subMaterial.id, quantity, quantities, rendering);
    })

    if(!rendering) {
        $.each(material.capacities, function(k, v) {
            if (typeof quantities[v.name] == 'undefined') {
                quantities[v.name] = 0;
            }
            quantities[v.name]  += v.amount * needs;
        })
    }



    return quantities;


}

var getAssemblingSelector = function(id) {
    if (items[id].type == 'fluid' || items[id].assemble_by.length == 0) return '';
    html = '<select class="select-assembling form-control select-translate" data-id="' + id + '">';

    $.each(items[id].assemble_by, function(k, v) {
        html += '<option value="' + v + '">' + translate(v, true) + '</option>';
    })
    html += '</select>';
    return html;
}

var getTargetSelector = function() {
    var html = '<select class="form-control select-target select-translate">';

    $.each(items, function(k, v) {
        if (v.is_resource || v.type == 'fluid') return true;

        html += '<option value="' + k + '">' + translate(k, true) + '</option>';

    })
    html += '</select>';
    return html;
}

var changeLanguage = function(language) {
    $.ajax({
        url: 'translations/' + language + '.js',
        dataType: 'jsonp',
        // async: false,
        complete: function() {
            translations[language] = translation;
            currentLanguage = language;
            saveHash('language', language);
            $('.translate').each(function() {
                var $this = $(this)
                $this.html(translate($this.data('string'), true))
            })
            $('.select-translate').each(function() {
                var $this = $(this)
                if ($this.hasClass('select-assembling')) {
                    var $new = $(getAssemblingSelector($this.data('id')))
                    $new.val($this.val())
                    $this.replaceWith($new)
                }
                if ($this.hasClass('select-target')) {
                    var $new = $(getTargetSelector())
                    $new.val($this.val())
                    $this.replaceWith($new)
                }
            })
        }
    })
}

var hashes = {}

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

$('#thead-target').on('DOMAttrModified propertychange change keyup', '.select-target', function() {
    var $this = $(this);
    var id = $this.val();
    var tr = $this.closest('tr');
    tr.find('.td-assembling-select').html(getAssemblingSelector(id));
    tr.attr('data-id', id);
    render();

})

$('#thead-target').on('keyup keydown keypress DOMAttrModified propertychange change', '.input-amount', calc)



$('#add-row button').click(function() {
    $('#thead-target').append(getTargetRow())
})

$('#table-material').on('click', '.row-remove button', function() {
    $(this).closest('tr').remove()
})

$('#select-translate').change(function() {
    changeLanguage($(this).val())
})

$('#container').on('change', '.select-assembling', calc)


loadHash()
if (typeof translateFallback == 'undefined') {
    var translateFallback = 'en';
}
if (typeof currentLanguage == 'undefined') {
    if (typeof hashes['language'] != 'undefined') {
        var currentLanguage  = hashes['language']
    } else {
        var currentLanguage = translateFallback;
    }
}
var translations = [];

if (typeof translation == 'undefined') {
    alert('fallback language init failed')
}
translations[translateFallback] = translation

;
(function() {
    var html = '';

    $.each(languages, function(k, v) {
        html += '<option value="' + v + '">' + v + '</option>'
    })
    $('#select-translate').html(html)
    $('#select-translate').val(currentLanguage)
    changeLanguage(currentLanguage)
})();


$('#thead-target').html(getTargetRow())
$('#show-resource').change(render)


