import csv
from itertools import count
import json
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = {}
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary
        # and add it to data
        count = 0
        for rows in csvReader:
            # Assuming a column named 'No' to
            # be the primary key
            key = rows['ID']
            if key != '':
                count += 1
            data[key] = rows
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
    return json.dumps(data), count
         
# Driver Code
# Decide the two file paths according to your
# computer system
csvFilePath = r'Neurons.csv'
jsonFilePath = r'Neurons.json'
# Call the make_json function
data, count = make_json(csvFilePath, jsonFilePath)

# json.
with open('Neurons.js','w',encoding='utf-8') as f:
    s = "function LoadNeuronData(){return {data:'"+data+"',count:"+str(count)+"};}"
    f.write(s)
    

