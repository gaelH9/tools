import os
directory = "./"

files_in_directory = os.listdir(directory)
print(files_in_directory)
filtered_files = [file for file in files_in_directory if file.endswith(".txt")]

for file in filtered_files:
	path_to_file = os.path.join(directory, file)
	os.remove(path_to_file)