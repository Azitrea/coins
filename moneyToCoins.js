function oddMoneyToCoins(amountToBePaid, paidAmount){
    var roundedAmountToBePaid = 0;

    try{
        if (amountToBePaid < 0){
            throw ("Amount to be payed can't be negative");
        } else {
            roundedAmountToBePaid = roundFiveOrZero(amountToBePaid);
        }   
        
        if (paidAmount < 0){
            throw ("Paid amount can't be negative");
        }  

        if ((paidAmount % 10 !== 0) && (paidAmount % 10 !== 5)){
            throw ("Paid amount can't contain 1 or 2 forint coins");
        } 

        if (paidAmount < roundedAmountToBePaid){
            throw ("Paid amount is not enough.");
        }
    } catch(err){
        return err;
    }

    //Array of possible bank notes and coins
    var notesAndCoins = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5];
    let amountOfNotesAndCoins = {};

    var oddMoney = paidAmount - roundedAmountToBePaid;
    console.log(`Odd Money: ${oddMoney}`);

    //If oddMoney is zero then fill up the object with 0;
    if(oddMoney === 0){
        for(var i in notesAndCoins){
            amountOfNotesAndCoins[notesAndCoins[i]] = 0;
        }
        return amountOfNotesAndCoins;
    }

    //Calculate the amount of coins
    for(var i in notesAndCoins){
        var val = ((oddMoney / Number(notesAndCoins[i])) | 0);
        amountOfNotesAndCoins[notesAndCoins[i]] = val;

        oddMoney = oddMoney % Number(notesAndCoins[i]);
    }

    //Returns the coins as an object
    return amountOfNotesAndCoins;

}

//Rounds the last digit of the given amount to 0 or 5, because we don't have 1 or 2 forint coins anymore
function roundFiveOrZero(amount){
    if (amount === 0){
        return 0;
    }

    var lastDigit = amount % 10;
    if(lastDigit >= 0 && lastDigit <= 2) {
        return amount - lastDigit;
    }

    if(lastDigit >= 3 && lastDigit <= 5) {
        return amount + (5 - lastDigit)
    }

    if (lastDigit >=6 && lastDigit <= 7) {
        return amount - (lastDigit - 5);
    }
    
    if (lastDigit >=8 && lastDigit <= 10) {
        return amount + (10 - lastDigit)
    }
}

//Test
console.log(oddMoneyToCoins(0, 0));