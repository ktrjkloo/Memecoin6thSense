
const a= 1000;
const n = 10;
const pairingsList = [];
const yourRankingList = [];


for(let  i=0 ; i<n ; i++){
    for(let  j=0 ; j<n ; j++)
        if(i!=j && !pairingsList.includes(`${i}${j}`) && !pairingsList.includes(`${j}${i}`)){
            pairingsList.push(`${i}${j}`);
        };
};
console.log(pairingsList);

function shuffle(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

const shuffledPairings = shuffle(pairingsList);
console.log(shuffledPairings);

function getNextPair(list){
    console.log(currentPairIndex);
    if(currentPairIndex<list.length){
        let targetPair = list[currentPairIndex];
        console.log(targetPair);
        let coinNameSlot1 = document.getElementById("coin1Name");
        let LogoSlot1 = document.getElementById("slot1Logo");
        let coinNameSlot2 = document.getElementById("coin2Name");
        let LogoSlot2 = document.getElementById("slot2Logo");
        
        var targetCoin1 = JSON.parse(document.getElementById(`coin${targetPair[0]}Info`).innerText);
        var targetCoin2 = JSON.parse(document.getElementById(`coin${targetPair[1]}Info`).innerText);
        console.log(targetCoin1);
        console.log(targetCoin2);
        coinNameSlot1.innerText = targetCoin1["name"];
        LogoSlot1.src = targetCoin1["logoURI"];
        coinNameSlot2.innerText = targetCoin2["name"];
        LogoSlot2.src = targetCoin2["logoURI"];
        




    }else{
        console.log("you have come to the end of all pairings")
        document.getElementById("coinSlotsContainer").classList.add("displayNone");
        var totals = 0;
        for(i= 0; i<n ; i++){
            var targetCoin = JSON.parse(document.getElementById(`coin${i}Info`).innerText);
            var coinName = targetCoin["name"];
            var coinLogo = targetCoin["logoURI"];
            var score = parseFloat(targetCoin["Score"]);
            // console.log(coinName,coinLogo,score);
            totals += score;
            var coinInformation = [coinName, coinLogo, score];
            if(i==0){yourRankingList.push(coinInformation);};
            var inserted = false;
            for(let  j=0 ; j<yourRankingList.length ; j++){
                if(score > yourRankingList[j][2] && inserted == false && i!=0){
                    yourRankingList.splice(j,0,coinInformation);
                    inserted = true;
                };
                if(j==yourRankingList.length-1 && inserted == false && i!=0){
                    yourRankingList.push(coinInformation);
                    inserted = true;
                };
            };
        };
        console.log(yourRankingList);
        const ranklist4hr = JSON.parse(document.getElementById("4hrRankList").innerHTML);
        const ranklist24hr = JSON.parse(document.getElementById("24hrRankList").innerHTML);
        const ranklistMcap = JSON.parse(document.getElementById("mcapRankList").innerHTML);
        var accuracy4hr = 0;
        var accuracy24hr = 0;
        var accuracyMcap = 0;

        for(i= 0; i<yourRankingList.length;i++){
            document.getElementById(`yourRank${i}`).src = yourRankingList[i][1];
            document.getElementById(`yourRank${i}Name`).innerText = yourRankingList[i][0];
            for(j=0; j<ranklist4hr.length;j++){
                if(yourRankingList[i][0]==ranklist4hr[j][0]){
                    accuracy4hr += Math.abs(j-i);
                }
                if(yourRankingList[i][0]==ranklist24hr[j][0]){
                    accuracy24hr += Math.abs(j-i);
                }
                if(yourRankingList[i][0]==ranklistMcap[j][0]){
                    accuracyMcap += Math.abs(j-i);
                }
            };            
        };
        console.log(`${Math.round(accuracy4hr/(9+7+5+3+1+1+3+5+7+9)*10000)/100}%`);
        console.log(`${Math.round(accuracy24hr/(9+7+5+3+1+1+3+5+7+9)*10000)/100}%`);
        console.log(`${Math.round(accuracyMcap/(9+7+5+3+1+1+3+5+7+9)*10000)/100}%`);
        document.getElementById("predictionAccuracy").innerHTML =`
            <h2 class="predAccText predAccText">4hr:</h2>
            <h1 class="BigFont predAccText">${Math.round(accuracy4hr/(9+7+5+3+1+1+3+5+7+9)*10000)/100}%</h1>
            <h2 class="predAccText predAccText">24hr:</h2>
            <h1 class="BigFont predAccText">${Math.round(accuracy24hr/(9+7+5+3+1+1+3+5+7+9)*10000)/100}%</h1>
            <h2 class="predAccText">MCAP:</h2>
            <h1 class="BigFont predAccText">${Math.round(accuracyMcap/(9+7+5+3+1+1+3+5+7+9)*10000)/100}%</h1>
        
        `;
        document.getElementById("endgame").classList.remove("displayNone");


    }
}

var currentPairIndex = 0;

function startGame(){
    getNextPair(shuffledPairings);
    document.getElementById("topLogoBar").classList.remove("hidden");
    document.getElementById("startBtn").classList.add("displayNone");
    document.getElementById("coinSlotsContainer").classList.remove("hidden");
};


function chooseA(){
    let currentPair = shuffledPairings[currentPairIndex];
    var targetCoin1 = JSON.parse(document.getElementById(`coin${currentPair[0]}Info`).innerText);
    targetCoin1["Score"] += 1;
    document.getElementById(`coin${currentPair[0]}Info`).innerText = JSON.stringify(targetCoin1);
    currentPairIndex++;
    getNextPair(shuffledPairings);
    
};

function chooseB(){
    let currentPair = shuffledPairings[currentPairIndex];
    let targetCoin2 = JSON.parse(document.getElementById(`coin${currentPair[1]}Info`).innerText);
    targetCoin2["Score"] += 1;
    document.getElementById(`coin${currentPair[1]}Info`).innerText = JSON.stringify(targetCoin2);
    currentPairIndex++;
    getNextPair(shuffledPairings);
    
};


document.addEventListener('DOMContentLoaded', () => {
    let CoinInfo = fetch('./info.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let CoinInfo = data;

        function generateCoins(){

            
            const randomNumberList = [];
        
            if (n == 0) {
                console.log(null);
            } 
            do {
                const randomNumber = Math.floor(Math.random() * CoinInfo.length + 1)
                if (!randomNumberList.includes(randomNumber)) {
                    randomNumberList.push(randomNumber);
                }
            } while (randomNumberList.length < n);
            
            function filterByAddress(address, data) {
                return data.filter(function(obj) {
                return obj.address.toLowerCase() === address.toLowerCase();
                });
            };
        
            let TokenInfo = fetch('./allTokenInfos.json').then(response => response.json()).then(data =>{
               
                const chosenCoinList = [];
                for(let  i=0 ; i<randomNumberList.length ; i++){
                    const element = randomNumberList[i];
                    const address = CoinInfo[element]["address"];
                    const coinChosen = filterByAddress(address,data);
                    const coinlogo = document.getElementById(`coin${i}Logo`);
                    try{
                        coinlogo.src = coinChosen[0]["logoURI"];
                    }catch{
                        generateCoins();                  
                    };
                    const chosenCoinInfo = Object.assign({}, coinChosen[0], CoinInfo[element])

                    const coinChosenInfo = document.getElementById(`coin${i}Info`)
                    chosenCoinInfo["Score"] = 0;
                    coinChosenInfo.innerText = JSON.stringify(chosenCoinInfo);
                    chosenCoinList.push(chosenCoinInfo);
                };
                console.log(chosenCoinList);

                

                function getListRankedByParam(coinlist,param){
                    const rankedList = [];

                    for(let  i=0 ; i<coinlist.length ; i++){
                        var coinName= coinlist[i]["name"]
                        var coinLogo = coinlist[i]["logoURI"]
                        var rankingParam = parseFloat(coinlist[i][param]);
                        if(rankingParam == "null" || rankingParam == "NaN"){rankingParam = 0};
                        var coinInformation = [coinName, rankingParam, coinLogo];
                        if(i==0){rankedList.push(coinInformation);};
                        
                        var inserted = false;
                        for(let  j=0 ; j<rankedList.length ; j++){
                            if(rankingParam > rankedList[j][1] && inserted == false && i!=0){
                                rankedList.splice(j,0,coinInformation);
                                inserted = true;
                            };
                            if(j==rankedList.length-1 && inserted == false && i!=0){
                                rankedList.push(coinInformation);
                                inserted = true;
                            };
                        };
                    };
                    return rankedList;

                };
                
                const rank4hChange = getListRankedByParam(chosenCoinList,"priceChange4hPercent")
                console.log(rank4hChange);
                const rank24hChange = getListRankedByParam(chosenCoinList,"priceChange24hPercent")
                console.log(rank24hChange);
                const rankMCap = getListRankedByParam(chosenCoinList,"mc")
                console.log(rankMCap);

                document.getElementById("4hrRankList").innerHTML = `${JSON.stringify(rank4hChange)}`;
                document.getElementById("24hrRankList").innerHTML = `${JSON.stringify(rank24hChange)}`;
                document.getElementById("mcapRankList").innerHTML = `${JSON.stringify(rankMCap)}`;
                console.log(JSON.parse(document.getElementById("4hrRankList").innerHTML));

                const scoreBoard = document.getElementById('Scoreboard');
                const tbody = scoreBoard.querySelector('tbody');
                tbody.innerHTML = '';

                
                for(let  i=0 ; i<chosenCoinList.length ; i++){
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>
                        <div class="table-container">
                            <h1 class="table-text" id="">${i+1}</h2>
                        </div>
                    </td>
                    <td>
                        <div class="table-container">
                            <img src="" alt="" class="smallLogoBox" id="yourRank${i}">
                            <h3 class="table-text" id="yourRank${i}Name"></h3>
                        </div>
                    </td>
                    <td>
                        <div class="table-container">
                            <img src="${rank4hChange[i][2]}" alt="" class="smallLogoBox">
                            <h2 class="table-text" id="${rank4hChange[i][1]>0?"upPercent":rank4hChange[i][1]<0?"downPercent":""}">${rank4hChange[i][1]>0?"+":""}${Math.trunc(rank4hChange[i][1]*1000)/1000}</h2>
                        </div>
                    </td>
                    <td>
                        <div class="table-container">
                            <img src="${rank24hChange[i][2]}" alt="" class="smallLogoBox">
                            <h2 class="table-text" id="${rank24hChange[i][1]>0?"upPercent":rank24hChange[i][1]<0?"downPercent":""}">${rank24hChange[i][1]>0?"+":""}${Math.trunc(rank24hChange[i][1]*1000)/1000}</h2>
                        </div>
                    </td>
                    <td>
                        <div class="table-container">
                            <img src="${rankMCap[i][2]}" alt="" class="smallLogoBox">
                            <h2 class="table-text" id="">${Math.trunc(rankMCap[i][1])}</h2>
                        </div>
                    </td>
                    `;
                    tbody.appendChild(row);
                };           
            }).catch(error => console.error('Error fetching JSON:', error));
                
        };
        generateCoins();

    }).catch(error => console.error('Error fetching JSON:', error));
    
});  



