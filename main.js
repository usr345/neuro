//чувствительность сенсоров
var threshold = 3;
//чувствительность нейронов
var neuro_threshhold = 3;
var sensors = new Array(9);

var synapses = [];
synapses.push(
    [1,0,0,1,0,0],
    [1,0,0,0,1,0],
    [1,0,0,0,0,1],
    [0,1,0,1,0,0],
    [0,1,0,0,1,0],
    [0,1,0,0,0,1],
    [0,0,1,1,0,0],
    [0,0,1,0,1,0],
    [0,0,1,0,0,1],
);

var neurons;

function multiply_matr (matr1, matr2)
{
    //строку на столбец
    var n = matr1.length;
    var m = matr2[0].length;
    var output = new Array(m);

    for (var i=0; i < m; ++i)
    {
        var sum = 0;
        for (var j=0; j < n; ++j)
        {
            sum += matr1[j]*matr2[j][i];
        }

        output[i] = sum;
    }

    return output;
}

function compare_threshold (vector, thresh)
{
    var n = vector.length;
    for (var i=0; i < n; ++i)
    {
        if (vector[i] >= thresh)
        {
            vector[i] = 1;
        }
        else
        {
            vector[i] = 0;
        }
    }
}


function update_sensors ()
{
    var n = sensors.length;

    for (var i=0; i < n; ++i)
    {
        var index = '#sensor' + i.toString();
        var val = $(index).val();
        val = parseInt(val);

        if (isNaN(val))
        {
            val = 0;
        }

        sensors[i] = val;
    }

    threshold = $('#threshold').val();
    threshold = parseInt(threshold);
    if (isNaN(threshold))
    {
        threshold = 3;
    }

    compare_threshold (sensors, threshold);
    neurons = multiply_matr (sensors, synapses);
    compare_threshold (neurons, threshold);
    output_matr(neurons, "#neuron");
}

function output_matr (matr, prefix)
{
    var n = matr.length;
    var m;
    if ($.isArray(matr[0]))
    {
        m = matr[0].length;
    }

    if (typeof(m) === 'undefined')
    {
        for (var i=0; i < n; ++i)
        {
            var index = prefix + i.toString();
            $(index).val(matr[i]);
        }
    }
    else
    {
        for (var i=0; i < n; ++i)
        {
            for (var j=0; j < m; ++j)
            {
                var index = prefix + i.toString() + "_" + j.toString();
                $(index).val(matr[i][j]);
            }
        }
    }
}


$( document ).ready(function() {
    $('#threshold').val(threshold.toString());

    output_matr (synapses, '#synapse');

    n = neurons.length;
    for (var i=0; i < n; ++i)
    {
        neurons[i] = 0;
    }
});

var neurons = [];
