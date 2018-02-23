local fs = {}
if isNode() then
	local nodeFS = js.global.process.mainModule:require("fs")
	-- node
	function fs.readFile(filename)
		local fp = io.open(filename)
		if (fp) then
			local content = fp:read('*a')
			fp:close()
			return content
		end

		-- node
		if nodeFS:existsSync(filename) then
			return nodeFS:readFileSync(filename, 'utf8')
		else
			return false
		end
	end
else
	function fs.readFile(filename)
		return quantorioBridge:getFileContent(filename)
	end
end

function fs.exists(path)
	return quantorioBridge:exists(path)
end

function fs.readDir(path)
	local ret = {}
	for file in quantorioBridge:readDir(path):gmatch('[^|]+') do
		table.insert(ret, file)
	end
	return ret
end

return fs
