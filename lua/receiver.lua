data = {}
data.data = {}
function data:extend(newdata)
    for i=1,#newdata do
        data.data[#data.data+1] = newdata[i]
    end
end

data:extend({
	{a=1}
})
