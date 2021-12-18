from PIL import Image, ImageOps
import sys
inputfile =sys.argv[1]
print(inputfile)
border = sys.argv[2]
color = sys.argv[3]
print(color)
outputfile =sys.argv[4]
print(outputfile)
ImageOps.expand(Image.open(inputfile),border=int(sys.argv[2]),fill=color).save(outputfile)
print(outputfile)