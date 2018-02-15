local fs = {}

function fs.readFile(filename)
	local fp = io.open(filename)
	if (fp) then
		local content = fp:read('*a')
		fp:close()
		return content
	end
	if js.global.window then
		-- browser
	else
		-- node
		local fs = js.global.process.mainModule:require("fs")
		if fs:existsSync(filename) then
			return fs:readFileSync(filename, 'utf8')
		else
			return false
		end
	end
end

function fs.readDir(path)
	local fs = js.global.process.mainModule:require("fs")
	local files = fs:readdirSync(path)
	local ret = {}
	for k, v in js.ipairs(files) do
		ret[k] = v
	end
	return ret
end

function fs.exists(name)
	local fs = js.global.process.mainModule:require("fs")
	return fs:existsSync(name)
end

function fs.copyFile(src, dest)
	local fs = js.global.process.mainModule:require("fs")
	return fs:copyFileSync(src, dest)
end

function fs.writeFile(name, content)
	local fs = js.global.process.mainModule:require("fs")
	return fs:writeFileSync(name, content)
end

function fs.dirname(name)
	local path = js.global.process.mainModule:require("path")
	return path:dirname(name)
end

return fs
