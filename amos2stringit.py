filename=raw_input("what is the name of the AMOS bankdump (including edges, nodes and reads)? ")
totSample=int(raw_input("how many samples are there? "))
sampleList=[]
for i in range(totSample):
    sampleList+=[raw_input("unique identifier of sample %i? "%i)]
#the script will search for this identifier in the eid of the read, and will count it towards the total of group i.
print "reading file"
bankdump=open(filename,"r+")
bestand=bankdump.readlines()
nest=0
ctg=[]#ctg collects contigs/nodes
cte=[]#cte collects edges
red=[]#collects reads, used for origins of mapped reads
tle=[]#collects mapped reads, to connect origins to contigs.
for i in range(len(bestand)):
	regel=bestand[i]
	print i
	if regel.startswith("{CTG"):
		ctg+=[[i,0]]
		nest=1
	if regel.startswith("{TLE") and nest==1:
		tle+=[[i,0]]
		nest=11
	if regel.startswith("}") and nest==1:
		ctg[len(ctg)-1][1]=i
		nest=0
	if regel.startswith("}") and nest==11:
		tle[len(tle)-1][1]=i
		nest=1
	if regel.startswith("{CTE"):
		cte+=[[i,0]]
		nest=2
	if regel.startswith("}") and nest==2:
		cte[len(cte)-1][1]=i
		nest=0
	if regel.startswith("{RED"):
		red+=[[i,0]]
		nest=3
	if regel.startswith("}") and nest==3:
		red[len(red)-1][1]=i
		nest=0
print "File read. Now analysing and writing the output."
graaf=[]
outfilename="AMOS2stringit-"+filename[:min(len(filename)-4,7)]+".txt"
output=open(outfilename,"w+")
contig=''
count=0
readmap={}
for re in red:
    readmap[bestand[re[0]+3][4:-1]]=bestand[re[0]+2][4:-1]
for co in ctg:
    co_tle=[]
    mapping=[0]*totSample
    for ti in tle:
        if ti[0]>co[0] and ti[1]<co[1]:
            co_tle+=[bestand[ti[1]-1][4:-1]]
    for rediid in co_tle:
        for i in range(totSample):
            if sampleList[i] in readmap[rediid]:
                mapping[i]+=1
    for i in range(co[0],co[1]):
        contig+=bestand[i]
    eid=contig.split('\n')[1][4:]
    iid=contig.split('\n')[2][4:]
    sequence=contig.split('.')[1][6:-1].translate(None,'\n-')
    graaf+=[["C",eid,iid,sequence,"["+",".join(["%s"%m for m in mapping])+"]"]]
    print "C",eid,iid,"truncseq",mapping
    contig=''
for ed in cte:
    #adjacency=bestand[ed[0]+1][4:-1]
    source=bestand[ed[0]+2].split(',')[0][4:]
    target=bestand[ed[0]+2].split(',')[1][:-1]
    iid=''#not necessary for Stringit
    graaf+=[["E",iid,source,target,""]]
    print "E",iid,source,target

print "printing all data to file for use in Stringit"

for elem in graaf:
    print>>output,''.join([elem[0],"\t",elem[1],"\t",elem[2],"\t",elem[3],"\t",elem[4]])
output.close()

