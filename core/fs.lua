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

	function fs.readDir(path)
		local files = nodeFS:readdirSync(path)
		local ret = {}
		for k, v in js.ipairs(files) do
			ret[k] = v
		end
		return ret
	end

	function fs.exists(name)
		return nodeFS:existsSync(name)
	end

	function fs.copyFile(src, dest)
		return nodeFS:copyFileSync(src, dest)
	end

	function fs.writeFile(name, content)
		return nodeFS:writeFileSync(name, content)
	end

	function fs.dirname(name)
		return path:dirname(name)
	end
else
	function fs.readFile(filename)
		return quantorioBridge:getFileContent(filename)
	end

	function fs.readDir(path)
		local ret = {}
		for file in quantorioBridge:readDir(path):gmatch('[^|]+') do
			table.insert(ret, file)
		end
		return ret
	end

	function fs.exists(path)
		return quantorioBridge:exists(path)
	end
end

return fs
