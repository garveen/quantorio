$('#thead-target').on('keyup keydown keypress DOMAttrModified propertychange change', '.select-target', function() {
    console.log(1)
    var $this = $(this);
    var id = $this.val();
    var tr = $this.closest('tr');
    tr.find('.td-assembling-select').html(getAssemblingSelector(id));
    tr.attr('data-id', id);
    render();

})


var calcRequirements = function(with_thead) {
    var requirements = {}
    $('#thead-target').children().each(function() {
        var $this = $(this)
        var target = $this.find('.select-target').val()
        var needs = $this.find('.input-amount').val()

        requirements = getUpstreamsRecursive(target, needs, requirements)

    })
    return requirements;
}

var render = function() {
    var requirements = calcRequirements(false)
    var html = ''
    $.each(requirements, function(k, v) {
        var material = resources[k];
        html += '<tr data-id="' + k + '">';
        html += '<td></td><td>' + translation[k] + '</td><td class="td-amount">' + v + '</td><td>' + getAssemblingSelector(k) + '</td><td class="factory-count"></td><td class="factory-power"></td><td class="factory-pollution"></td>';
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
    var requirements = calcRequirements(true)
    var electric_power = 0;
    var pollution = 0;
    var _calc = function(k, v) {

        var tr = $('tr[data-id=' + k + ']');
        var factory = factories[tr.find('.select-assembling').val()]
        tr.find('.td-amount').html(v)

        if (typeof factory == 'undefined') {
            tr.find('.factory-count').html('')
            tr.find('.factory-power').html('')
            tr.find('.factory-pollution').html('')
        } else {
            var count = v / 60 / factory.speed * resources[k].time
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
$('#container').on('change', '.select-assembling', calc)
$('#thead-target').on('keyup keydown keypress DOMAttrModified propertychange change', calc)

var getUpstreamsRecursive = function(id, needs, quantities) {
    var material = resources[id]
    var subMaterials = material.materials

    var show_resource = $('#show-resource').is(':checked')
    $.each(subMaterials, function(k, v) {
        subMaterial = resources[v.id];
        if (!show_resource && subMaterial.is_resource) {
            return true;
        }
        if (typeof quantities[v.id] == 'undefined') {
            quantities[v.id] = 0;
        }
        quantity = v.quantity * needs / subMaterial.capacity;
        quantities[v.id] += quantity;
        quantities = getUpstreamsRecursive(subMaterial.id, quantity, quantities);
    })

    return quantities;


}

var getAssemblingSelector = function(id, className, withFormControl) {
    if (typeof className == 'undefined') className = '';
    if (typeof withFormControl == 'undefined') withFormControl = true;
    html = '<select class="' + className + (withFormControl ? ' select-assembling form-control' : '') + '">';

    $.each(resources[id].assemble_by, function(k, v) {
        html += '<option value="' + v + '">' + translation[v] + '</option>';
    })
    html += '</select>';
    return html;
}

var getTargetSelector = function() {
    var html = '<select class="form-control select-target">';

    $.each(resources, function(k, v) {

        html += '<option value="' + k + '">' + translation[k] + '</option>';

    })
    html += '</select>';
    return html;
}

var translate = function(language) {
    $.ajax({
        url: 'translations/' + language + '.js',
        dataType: 'jsonp',
        complete: function() {
            $('.translate').each(function() {
                var $this = $(this)
                $this.html(translation[$this.data('string')])
            })
            $('#thead-target').html(getTargetRow())
            render()
        }
    })


}

$('#add-row button').click(function() {
    $('#thead-target').append(getTargetRow())
})

$('#table-material').on('click', '.row-remove button', function() {
    $(this).closest('tr').remove()
})
$('#select-translate').change(function() {
    translate($(this).val())
})


$('#thead-target').html(getTargetRow())
$('#show-resource').change(render)
translate($('#select-translate').val())
