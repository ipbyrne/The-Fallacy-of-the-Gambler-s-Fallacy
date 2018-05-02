var bankroll = 100000000000;
var firstbank = bankroll;
var tBank = bankroll*10;
var tBankLow = tBank;
var runningGain = 0;
var trials = 1000000;
var winrate = 0.47;

var betSize = 10;
var betCap = 10000;

var sequence = false;

var successTrials = 0;
var failTrials = 0;

var startBank = 0;
var endBank = 0;

var count = 0;

var j = 1000;

while(j>0)
{
  var i = trials;
  while(i>0)
  {
   if(count == 0) // new sequence
    {
      sequence = true;
      startBank = bankroll;
    }

    var firstWin = false;
    if(Math.random() >= .50) // win
      {
       if(count == 0) {firstWin = true;}
       count++;
       bankroll += betSize;
       betSize--;
       if(firstWin == true)
        {
          count = 0;
          sequence = false;
          endBank = bankroll
          console.log("Total Gain: " + (endBank - startBank));
          betSize = 10;
        }
      }
      else // Loss
      {
       count--;
       bankroll -= betSize;
       betSize++;
       //if(betSize == betCap) {i = 0; console.log("BETSIZE REACHED CAP, END OF RUN: " + (bankroll-firstbank));}
      }

    if(count == 0 && firstWin == false)
      {
        sequence = false;
        endBank = bankroll
        console.log("Total Gain: " + (endBank - startBank));
        betSize = 10;
      }

    if(bankroll <= 0) {i = 0; console.log("BANKROLL REACHED ZERO, END OF RUN"); sequence = false; endBank = bankroll; betSize = 10;}
  i--;
  }

  if(bankroll>0)
  {
    successTrials++;
  }
  else
  {
    failTrials++;
    bankroll = 0;
  }
  runningGain += bankroll-firstbank;
  tBank += runningGain;
  if(tBank < tBankLow) {tBankLow = tBank;}
  bankroll = firstbank
  j--;
}

console.log("Profitable Trials: " + (successTrials/1000)*100 + "%");
console.log("Net Gain: " + runningGain);
console.log("Lowest Value of Bank Roll: " + tBankLow);
