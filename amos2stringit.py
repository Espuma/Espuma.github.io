print "searching all nodes and edges."
bankdump=open("3ecoliCTE-CTG.txt","r+")
bestand=bankdump.readlines()
nest=0
ctg=[]
cte=[]
for i in range(len(bestand)):
##    if i>25832361 and i<25832684:
        regel=bestand[i]
        print i
        if regel.startswith("{CTG"):
            ctg+=[[i,0]]
            nest=1
        if regel.startswith("{TLE") and nest==1:
            ctg[len(ctg)-1][1]=i
            nest=0
        if regel.startswith("{CTE"):
            cte+=[[i,0]]
            nest=2
        if regel.startswith("}") and nest==2:
            cte[len(cte)-1][1]=i
            nest=0
print "Found them. Now collecting all other data."
graaf=[]
output=open("3ecolinodesandedges.txt","w+")
contig=''
regel=''
count=0
for co in ctg:
    for i in range(co[0],co[1]):
        contig+=bestand[i]
    eid=contig.split('\n')[1][4:]
    iid=contig.split('\n')[2][4:]
    sequence=contig.split('.')[1][6:-1].translate(None,'\n-')
    graaf+=[["C",eid,iid,sequence,""]]
    contig=''
for ed in cte:
    adjacency=bestand[ed[0]+1][4:-1]
    source=bestand[ed[0]+2].split(',')[0][4:]
    target=bestand[ed[0]+2].split(',')[1][:-1]
    iid=bestand[ed[0]+3][4:-1]#needs to check for 'iid' at beginning, and just make a new number if it isn't there...
    graaf+=[["E",iid,source,target,adjacency]]
print "printing all data to file for use in Stringit"

for elem in graaf:
    print>>output,''.join([elem[0],"\t",elem[1],"\t",elem[2],"\t",elem[3],"\t",elem[4]])
output.close()
