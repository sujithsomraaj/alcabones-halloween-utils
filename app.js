const axios = require("axios");
var fs = require('fs');

const fetch = async () => {
    for(let i=6461;i<=10000;i++){
        const res = await axios.get(`https://api.alcabones.io/tokens/v2/${i}`);
        console.log(res.data.attributes[0].value, i);
        
        /** Writing To File */
        let data = require("./families.json");
        data[res.data.attributes[0].value].push(i);
        fs.writeFile("families.json", JSON.stringify(data), "utf8",function(err) {
            if(err){
                console.log(err);
            }
        });
    }
};

const check = async () => {
    let data = require("./families.json");
    const duplicateElements = toFindDuplicates(data["Contract Killers"]);
    console.log(duplicateElements);
    // console.log(data.Boneannos.length);
    // console.log(data.Colombones.length);
    // console.log(data.Napolebones.length);
    // console.log(data.Gambones.length);
    // console.log(data.Corlebones.length);
    // console.log(data.Rambones.length);
    // console.log(data["Contract Killers"].length);
}

function toFindDuplicates(arry) {
    const uniqueElements = new Set(arry);
    const filteredElements = arry.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(uniqueElements)]
}

check();