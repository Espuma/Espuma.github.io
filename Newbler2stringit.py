print("reading 454ContigGraph.txt and 454Contigs.ace in this folder")
totSample=int(raw_input("how many samples are there? "))
sampleList=[]
for i in range(totSample):
    sampleList+=[raw_input("unique identifier of sample %i? "%(i+1))]
split=raw_input("what is the break point for the unique identifier in the read name?\nFor example, with unique identifier AAA in read name AAA-0000001,\nthe break point is \'-\'.")
output=open(raw_input("what do you want to call the output file? "),"w+")

contiggraphfile=open("454ContigGraph.txt","r+")
contiggraph=contiggraphfile.readlines()
contiggraphfile.close()

ace=open("454Contigs.ace","r+")
acefile=ace.readlines()
ace.close()

print("File read. Now analysing and writing the output.")

contigs={}
links=[]
linkno=0
sequence=""
collectcontig=0

for i in range(len(contiggraph)):
    regel=contiggraph[i]
    if regel.split("\t")[1][:6]=='contig':#check for contig entry
        contigs[int(regel.split("\t")[0])]=[regel.split("\t")[1],"",totSample*[0]]#[contigname,sequence,readmaps]
    if regel.split("\t")[0]=='C':
        links+=[[regel.split("\t")[1],regel.split("\t")[3]]]

for i in range(len(acefile)):
    regel=acefile[i]
    if collectcontig==1 and len(regel.split(" "))==1:
        sequence+=regel
    if regel.startswith("BQ"):
        collectcontig=0
        contigs[currentcontig][1]=sequence.translate(None,'BQ\n*')
        sequence=""
    if regel.startswith("CO"):
        collectcontig=1
        currentcontig=int(regel.split(" ")[1][6:])
        contigs[currentcontig][0]=regel.split(" ")[1]
    if regel.startswith("RD"):
        contigs[currentcontig][2][sampleList.index(regel.split(" ")[1].split(split)[0])]+=1

for i in contigs.keys():
    maplijst="["+",".join("%s"%m for m in contigs[i][2])+"]"
    output.write("C\t%s\t%i\t%s\t%s\n"%(contigs[i][0],i,contigs[i][1],maplijst))
for link in links:
    linkno+=1
    output.write("E\t%i\t%s\t%s\n"%(linkno,link[0],link[1]))

output.close()
