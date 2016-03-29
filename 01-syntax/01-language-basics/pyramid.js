var pyramid = "";
scale = 30;
for (var i = 0; i <= scale/2 ; i++ ) {
  for (var j = 0; j <= scale; j++){
    if ((j > (scale/2-i))&&(j<(scale/2+i))){
      pyramid += "#";
    } else {
      pyramid += " ";
    }
  }
  console.log(pyramid);
  pyramid = "";
  }


