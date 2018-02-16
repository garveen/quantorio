local fs = {}
if not js.global.window then
	-- node
	function fs.readFile(filename)
		local fp = io.open(filename)
		if (fp) then
			local content = fp:read('*a')
			fp:close()
			return content
		end

		-- node
		local fs = js.global.process.mainModule:require("fs")
		if fs:existsSync(filename) then
			return fs:readFileSync(filename, 'utf8')
		else
			return false
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
else
	local filesystem = {}
	function fs.syncDir()
		local function res(subdir, parent)
			for name, content in js.pairs(subdir) do
				local dir = parent
				if content == true then
					dir[name] = content
				else
					dir[name] = {}
					res(content, dir[name])
				end
			end
		end
		res(js.global.fs, filesystem)
	end

	fs.syncDir()

	function fs.readFile(filename)
		return js.global:getFileContent(filename)
	end

	function fs.readDir(path)
		local ret = {}
		local dir = filesystem
		for part in path:gmatch('[^/]+') do
			dir = dir[part]
			if not dir then return {} end
		end

		local ret = {}
		for k in pairs(dir) do
			table.insert(ret, k)
		end
		return ret
	end

	function fs.exists(path)
		local ret = {}
		local dir = filesystem
		for part in path:gmatch('[^/]+') do
			dir = dir[part]
			if not dir then return false end
		end
		return true
	end
end

return fs
