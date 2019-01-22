if (nutriInfo || nutriPercent || foodInfo){
// 1.tool function
//create DOM element
function tag(tagName){
    return document.createElement(tagName);
}

function createPopUp1(entID){
    var div = tag('div');
    div.id = entID
    var title = tag('h2');
    title.id = 'nutriName'
    title.innerHTML = '';
    div.appendChild(title);
    var content = tag('p');
    content.id = 'nutriPercent'
    content.innerHTML = '';
    div.appendChild(content);

    var desc = tag('h4');
    desc.textContent = 'Inner Radius - ';
    div.appendChild(desc);

    var desc2 = tag('h4');
    desc2.textContent = 'Food Containment/Daily Intake Percentage';
    div.appendChild(desc2);

    var desc = tag('h4');
    desc.textContent = 'Outer Radius - ';
    div.appendChild(desc);

    var desc2 = tag('h4');
    desc2.textContent = 'Percentage of Various Nutrients Required Daily';
    div.appendChild(desc2);

    return div;
}

//create popup_left, enter div's id via para1
function createPopUp2(entID){
    var div = tag('div');
    div.id = entID;
    var divImg = tag('div');
    divImg.className = 'divImg';
    divImg.id = 'divImg'
    divImg.style.background = "";
    // console.log(divImg);
    div.appendChild(divImg);

    var title = tag('h3');
    title.id = 'gi-level'
    title.textContent = 'GI Level';
    div.appendChild(title);
    var content = tag('p');
    content.id = 'gi-level-value'
    content.textContent = '';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);

    var title = tag('h3');
    title.id = 'color'
    title.textContent = 'COLOR';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = '';
    content.id = 'color-value'
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    
    var title = tag('h3');
    title.textContent = 'CATEGORY';
    title.id = 'category'
    div.appendChild(title);
    var content = tag('p');
    content.id = 'category-value'
    content.textContent = '';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    // console.log(div);

    var title = tag('h3');
    title.textContent = 'AMOUNT PER DAY';
    title.id = 'amount'
    div.appendChild(title);
    var content = tag('p');
    content.textContent = '';
    content.id = 'amount-value'
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    // console.log(div);

    return div;
}
function changeText2(info1,info2,info3,info4,info5){
    var dom1 = document.getElementById('gi-level-value');
    var dom2 = document.getElementById('color-value');
    var dom3 = document.getElementById('category-value');
    var dom4 = document.getElementById('amount-value');
    var dom5 = document.getElementById('divImg')
    dom1.innerHTML = info1
    dom2.innerHTML = info2
    dom3.innerHTML = info3
    dom4.innerHTML = info4
    dom5.style = info5
}

//draw ring chart, and set svg's id via entId
function drawRingchart(entId,index){
    var width = 460,
        height = 300,
        cwidth = 30;

    var color = d3.scale.category20c();

    var pie = d3.layout.pie()
        .sort(null);

    var arc = d3.svg.arc();
    var svg = d3.select("#popup_left").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('class','ringChart')
        .attr("id", entId)
        .append("g")
        .attr("transform", "translate(" + (-80 + width / 3) + "," + (height / 3 -10) + ")")

    var gs = svg.selectAll("g").data(d3.values(nutriPercent[index])).enter().append("g");
    var path = gs.selectAll("path")
        .data(function(d) { return pie(d); })
        .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", function(d, i, j) { return arc.innerRadius(16+cwidth*j).outerRadius(cwidth*(j+1))(d); });

    function drawRect(){
        var data2 = [
            {'name':'Carbohydrate(sugar)'},
            {'name':'Total fat'},
            {'name':'Protein'},
            {'name':'Mineral Substance'},
            {'name':'Fiber'},
            {'name':'Other'},
        ]
        // var data2 = [1,2,3,4,5,6]
        var w = 300;
        var h = 100;
        var gs2 = svg.selectAll("g").data(d3.values(data2)).enter().append("g");
        var rectangle = gs2.selectAll('rect')
                            .data(data2)
                            .enter()
                            .append("rect")
                            .attr("y", function(d, i) {
                                return (i * 18) - 50;  //Bar width of 20 plus 1 for padding
                            })
                            .attr("x", 80)
                            .attr("width", 16)
                            .attr("height", 6)
                            .attr("fill", function(d, i) { return color(i); });
        var text =gs2.selectAll('text')
                    .data(data2)
                    .enter()
                    .append('text')
                    .text(function(d,i) {
                        return data2[i].name;
                })
                .attr("y", function(d, i) {
                    return -45 +i * (w / data2.length)/2.7;
            })
            .attr("x", function(d) {
                    return 100 ;
            })
            .style("fill","#525e6a")
        }
        drawRect();

    return svg
}

//position popup window to certain div as my icon, the popup will appear when the mouse hover at "myicon",
//while whichpop determines which kind of popup to choose: popup_left or popup_down
function positionPopUp(entID,whichpop){
    var myicon = document.getElementById(entID);
    var currentPop = document.getElementById(whichpop);

    function showPopup(evt) {
    
        myicon.style = "cursor:pointer;opacity:0.95";
        
        var iconPos = myicon.getBoundingClientRect();
        if(whichpop == 'popup_left'){
            // console.log(iconPos.right);
            if(iconPos.right < 1200){
                currentPop.style.left = (iconPos.right + 20) + "px";
            }else{
                currentPop.style.left = (iconPos.right - 350) + "px";
            }
            
            currentPop.style.top = (window.scrollY + iconPos.top - 70) + "px";
        }else if(whichpop == 'popup_down'){
            currentPop.style.left = (iconPos.right -144) + "px";
            // console.log(iconPos.top);
            if(iconPos.top<400){
                currentPop.style.top = (window.scrollY + iconPos.top + 24) + "px";
            }else{
                currentPop.style.top = (window.scrollY + iconPos.top - 350) + "px";
            }
            
        }else{
            return;
        }
        currentPop.style.display = "block";
    }
    function hidePopup(evt) {
        myicon.style = "opacity:0.6";
        currentPop.style.display = "none";

    }
    myicon.addEventListener("mouseover", showPopup);
    myicon.addEventListener("mouseout", hidePopup);

}

function changeText(info1,info2){
    var name = document.getElementById('nutriName');
    var percent = document.getElementById('nutriPercent');
    name.innerHTML = info1
    percent.innerHTML = info2
}
function clearText(){
    var name = document.getElementById('nutriName');
    var percent = document.getElementById('nutriPercent');
    name.innerHTML = ''
}

///////////////////////////////////////////////////////////////////////
//2.监听全局点击事件
// var nutriCont = [
//     {'name':'total fat231','percentage':'8%'},
//     {'name':'Protein','percentage':'65%'}
// ]  

// document.onmouseover = function(eee){
//     tarNum = eee.target.className.baseVal;
//     var list=[]
//     switch(tarNum){
//         case 'st54':
//         console.log('first');
//         list=[];
//         list.push(nutriCont[0]);
//         enterCont(list[0].name,list[0].percentage)
//         positionPopUp("myicon",'popup_left');
//         break;
        
//         case 'st60':
//         list=[];
//         list.push(nutriCont[1]);
//         enterCont(list[0].name,list[0].percentage)
//         positionPopUp("myicon2",'popup_left');
//         break;
//     }
        
// }
var pop1 = createPopUp1('popup_left');
document.body.appendChild(pop1);

var pop2 = createPopUp2('popup_down');
document.body.appendChild(pop2);

document.onmouseover = function(eee){
    num = eee.target.className.baseVal
    // console.log(num);
    // pop1 = createPopUp1('popup_left');
    var ind=0;
    switch(num){
        case 'st014':
        ind = 0;
        info1 = nutriInfo[0].name;
        info2 = nutriInfo[0].percentage;
        changeText(info1, info2);
        ind = 0;
        break;

        case 'st016':
        ind = 0;
        info1 = nutriInfo[1].name;
        info2 = nutriInfo[1].percentage;
        changeText(info1, info2);
        ind = 1;
        break;

        case 'st020':
        ind = 0;
        info1 = nutriInfo[2].name;
        info2 = nutriInfo[2].percentage;
        changeText(info1, info2);
        ind = 2;
        break;

        case 'st025':
        ind = 0;
        info1 = nutriInfo[3].name;
        info2 = nutriInfo[3].percentage;
        changeText(info1, info2);
        ind = 3;
        break;

        case 'st026':
        ind = 0;
        info1 = nutriInfo[4].name;
        info2 = nutriInfo[4].percentage;
        changeText(info1, info2);
        ind = 4;
        break;

        case 'st041':
        ind = 0;
        info1 = nutriInfo[5].name;
        info2 = nutriInfo[5].percentage;
        changeText(info1, info2);
        ind = 5;
        break;

        case 'st018':
        ind = 0;
        info1 = nutriInfo[6].name;
        info2 = nutriInfo[6].percentage;
        changeText(info1, info2);
        ind = 6;
        break;

        case 'st019':
        ind = 0;
        info1 = nutriInfo[7].name;
        info2 = nutriInfo[7].percentage;
        changeText(info1, info2);
        ind = 7;
        break;

        case 'st023':
        ind = 0;
        info1 = nutriInfo[8].name;
        info2 = nutriInfo[8].percentage;
        changeText(info1, info2);
        ind = 8;
        break;

        case 'st180':
        ind = 0;
        info1 = nutriInfo[9].name;
        info2 = nutriInfo[9].percentage;
        changeText(info1, info2);
        ind = 9;
        break;

        case 'st021':
        ind = 0;
        info1 = nutriInfo[10].name;
        info2 = nutriInfo[10].percentage;
        changeText(info1, info2);
        ind = 10;
        break;

        case 'st022':
        ind = 0;
        info1 = nutriInfo[11].name;
        info2 = nutriInfo[11].percentage;
        changeText(info1, info2);
        ind = 11;
        break;

        case 'st042':
        ind = 0;
        info1 = nutriInfo[12].name;
        info2 = nutriInfo[12].percentage;
        changeText(info1, info2);
        ind = 12;
        break;

        case 'st2-14':
        ind = 0;
        info1 = nutriInfo[13].name;
        info2 = nutriInfo[13].percentage;
        changeText(info1, info2);
        ind = 13;
        break;

        case 'st2-20':
        ind = 0;
        info1 = nutriInfo[14].name;
        info2 = nutriInfo[14].percentage;
        changeText(info1, info2);
        ind = 14;
        break;
        
        case 'st2-25':
        ind = 0;
        info1 = nutriInfo[15].name;
        info2 = nutriInfo[15].percentage;
        changeText(info1, info2);
        ind = 15;
        break;

        case 'st2-31':
        ind = 0;
        info1 = nutriInfo[16].name;
        info2 = nutriInfo[16].percentage;
        changeText(info1, info2);
        ind = 16;
        break;

        case 'st2-18':
        ind = 0;
        info1 = nutriInfo[17].name;
        info2 = nutriInfo[17].percentage;
        changeText(info1, info2);
        ind = 17;
        break;

        case 'st2-19':
        ind = 0;
        info1 = nutriInfo[18].name;
        info2 = nutriInfo[18].percentage;
        changeText(info1, info2);
        ind = 18;
        break;

        case 'st2-23':
        ind = 0;
        info1 = nutriInfo[19].name;
        info2 = nutriInfo[19].percentage;
        changeText(info1, info2);
        ind = 19;
        break;

        case 'st2-24':
        ind = 0;
        info1 = nutriInfo[20].name;
        info2 = nutriInfo[20].percentage;
        changeText(info1, info2);
        ind = 20;
        break;

        case 'st2-180':
        ind = 0;
        info1 = nutriInfo[21].name;
        info2 = nutriInfo[21].percentage;
        changeText(info1, info2);
        ind = 21;
        break;

        case 'st2-21':
        ind = 0;
        info1 = nutriInfo[22].name;
        info2 = nutriInfo[22].percentage;
        changeText(info1, info2);
        ind = 22;
        break;

        case 'st2-22':
        ind = 0;
        info1 = nutriInfo[23].name;
        info2 = nutriInfo[23].percentage;
        changeText(info1, info2);
        ind = 23;
        break;

        case 'st2-42':
        ind = 0;
        info1 = nutriInfo[24].name;
        info2 = nutriInfo[24].percentage;
        changeText(info1, info2);
        ind = 24;
        break;

        case 'st3-16':
        ind = 0;
        info1 = nutriInfo[25].name;
        info2 = nutriInfo[25].percentage;
        changeText(info1, info2);
        ind = 25;
        break;

        case 'st3-20':
        ind = 0;
        info1 = nutriInfo[26].name;
        info2 = nutriInfo[26].percentage;
        changeText(info1, info2);
        ind = 26;
        break;

        case 'st3-25':
        ind = 0;
        info1 = nutriInfo[27].name;
        info2 = nutriInfo[27].percentage;
        changeText(info1, info2);
        ind = 27;
        break;

        case 'st3-35':
        ind = 0;
        info1 = nutriInfo[28].name;
        info2 = nutriInfo[28].percentage;
        changeText(info1, info2);
        ind = 28;
        break;

        case 'st3-31':
        ind = 0;
        info1 = nutriInfo[29].name;
        info2 = nutriInfo[29].percentage;
        changeText(info1, info2);
        ind = 29;
        break;

        case 'st3-33':
        ind = 0;
        info1 = nutriInfo[30].name;
        info2 = nutriInfo[30].percentage;
        changeText(info1, info2);
        ind = 30;
        break;

        case 'st3-19':
        ind = 0;
        info1 = nutriInfo[31].name;
        info2 = nutriInfo[31].percentage;
        changeText(info1, info2);
        ind = 31;
        break;

        case 'st3-23':
        ind = 0;
        info1 = nutriInfo[32].name;
        info2 = nutriInfo[32].percentage;
        changeText(info1, info2);
        ind = 32;
        break;

        case 'st3-21':
        ind = 0;
        info1 = nutriInfo[33].name;
        info2 = nutriInfo[33].percentage;
        changeText(info1, info2);
        ind = 33;
        break;

        case 'st3-22':
        ind = 0;
        info1 = nutriInfo[34].name;
        info2 = nutriInfo[34].percentage;
        changeText(info1, info2);
        ind = 34;
        break;

        case 'st4-22':
        ind = 0;
        info1 = nutriInfo[35].name;
        info2 = nutriInfo[35].percentage;
        changeText(info1, info2);
        ind = 35;
        break;

        case 'st5-28':
        ind = 0;
        info1 = nutriInfo[36].name;
        info2 = nutriInfo[36].percentage;
        changeText(info1, info2);
        ind = 36;
        break;

        case 'st5-16':
        ind = 0;
        info1 = nutriInfo[37].name;
        info2 = nutriInfo[37].percentage;
        changeText(info1, info2);
        ind = 37;
        break;

        case 'st5-17':
        ind = 0;
        info1 = nutriInfo[38].name;
        info2 = nutriInfo[38].percentage;
        changeText(info1, info2);
        ind = 38;
        break;

        case 'st5-31':
        ind = 0;
        info1 = nutriInfo[39].name;
        info2 = nutriInfo[39].percentage;
        changeText(info1, info2);
        ind = 39;
        break;

        case 'st5-22':
        ind = 0;
        info1 = nutriInfo[40].name;
        info2 = nutriInfo[40].percentage;
        changeText(info1, info2);
        ind = 40;
        break;

        case 'st6-16':
        ind = 0;
        info1 = nutriInfo[41].name;
        info2 = nutriInfo[41].percentage;
        changeText(info1, info2);
        ind = 41;
        break;

        case 'st6-25':
        ind = 0;
        info1 = nutriInfo[42].name;
        info2 = nutriInfo[42].percentage;
        changeText(info1, info2);
        ind = 42;
        break;

        case 'st6-32':
        ind = 0;
        info1 = nutriInfo[43].name;
        info2 = nutriInfo[43].percentage;
        changeText(info1, info2);
        ind = 43;
        break;

        case 'st6-37':
        ind = 0;
        info1 = nutriInfo[44].name;
        info2 = nutriInfo[44].percentage;
        changeText(info1, info2);
        ind = 44;
        break;

        case 'st6-31':
        ind = 0;
        info1 = nutriInfo[45].name;
        info2 = nutriInfo[45].percentage;
        changeText(info1, info2);
        ind = 45;
        break;

        case 'st6-30':
        ind = 0;
        info1 = nutriInfo[46].name;
        info2 = nutriInfo[46].percentage;
        changeText(info1, info2);
        ind = 46;
        break;

        case 'st6-26':
        ind = 0;
        info1 = nutriInfo[47].name;
        info2 = nutriInfo[47].percentage;
        changeText(info1, info2);
        ind = 47;
        break;

        case 'st6-41':
        ind = 0;
        info1 = nutriInfo[48].name;
        info2 = nutriInfo[48].percentage;
        changeText(info1, info2);
        ind = 48;
        break;

        case 'st6-19':
        ind = 0;
        info1 = nutriInfo[49].name;
        info2 = nutriInfo[49].percentage;
        changeText(info1, info2);
        ind = 49;
        break;

        case 'st6-23':
        ind = 0;
        info1 = nutriInfo[50].name;
        info2 = nutriInfo[50].percentage;
        changeText(info1, info2);
        ind = 50;
        break;

        case 'st6-24':
        ind = 0;
        info1 = nutriInfo[51].name;
        info2 = nutriInfo[51].percentage;
        changeText(info1, info2);
        ind = 51;
        break;

        case 'st6-22':
        ind = 0;
        info1 = nutriInfo[52].name;
        info2 = nutriInfo[52].percentage;
        changeText(info1, info2);
        ind = 52;
        break;

        case 'st7-14':
        ind = 0;
        info1 = nutriInfo[53].name;
        info2 = nutriInfo[53].percentage;
        changeText(info1, info2);
        ind = 53;
        break;

        case 'st7-20':
        ind = 0;
        info1 = nutriInfo[54].name;
        info2 = nutriInfo[54].percentage;
        changeText(info1, info2);
        ind = 54;
        break;

        case 'st7-25':
        ind = 0;
        info1 = nutriInfo[55].name;
        info2 = nutriInfo[55].percentage;
        changeText(info1, info2);
        ind = 54;
        break;

        case 'st7-31':
        ind = 0;
        info1 = nutriInfo[56].name;
        info2 = nutriInfo[56].percentage;
        changeText(info1, info2);
        ind = 56;
        break;

        case 'st7-30':
        ind = 0;
        info1 = nutriInfo[57].name;
        info2 = nutriInfo[57].percentage;
        changeText(info1, info2);
        ind = 57;
        break;

        case 'st7-18':
        ind = 0;
        info1 = nutriInfo[58].name;
        info2 = nutriInfo[58].percentage;
        changeText(info1, info2);
        ind = 58;
        break;

        case 'st7-19':
        ind = 0;
        info1 = nutriInfo[59].name;
        info2 = nutriInfo[59].percentage;
        changeText(info1, info2);
        ind = 59;
        break;

        case 'st7-23':
        ind = 0;
        info1 = nutriInfo[60].name;
        info2 = nutriInfo[60].percentage;
        changeText(info1, info2);
        ind = 60;
        break;

        case 'st7-24':
        ind = 0;
        info1 = nutriInfo[61].name;
        info2 = nutriInfo[61].percentage;
        changeText(info1, info2);
        ind = 61;
        break;

        case 'st7-180':
        ind = 0;
        info1 = nutriInfo[62].name;
        info2 = nutriInfo[62].percentage;
        changeText(info1, info2);
        ind = 62;
        break;

        case 'st7-21':
        ind = 0;
        info1 = nutriInfo[63].name;
        info2 = nutriInfo[63].percentage;
        changeText(info1, info2);
        ind = 63;
        break;

        case 'st8-28':
        ind = 0;
        info1 = nutriInfo[64].name;
        info2 = nutriInfo[64].percentage;
        changeText(info1, info2);
        ind = 64;
        break;

        case 'st8-32':
        ind = 0;
        info1 = nutriInfo[65].name;
        info2 = nutriInfo[65].percentage;
        changeText(info1, info2);
        ind = 65;
        break;

        case 'st8-29':
        ind = 0;
        info1 = nutriInfo[66].name;
        info2 = nutriInfo[66].percentage;
        changeText(info1, info2);
        ind = 66;
        break;

        case 'st8-36':
        ind = 0;
        info1 = nutriInfo[67].name;
        info2 = nutriInfo[67].percentage;
        changeText(info1, info2);
        ind = 67;
        break;

        case 'st8-26':
        ind = 0;
        info1 = nutriInfo[68].name;
        info2 = nutriInfo[68].percentage;
        changeText(info1, info2);
        ind = 68;
        break;

        case 'st8-39':
        ind = 0;
        info1 = nutriInfo[69].name;
        info2 = nutriInfo[69].percentage;
        changeText(info1, info2);
        ind = 69;
        break;

        case 'st8-18':
        ind = 0;
        info1 = nutriInfo[70].name;
        info2 = nutriInfo[70].percentage;
        changeText(info1, info2);
        ind = 70;
        break;

        case 'st8-24':
        ind = 0;
        info1 = nutriInfo[71].name;
        info2 = nutriInfo[71].percentage;
        changeText(info1, info2);
        ind = 71;
        break;

        case 'st9-14':
        ind = 0;
        info1 = nutriInfo[72].name;
        info2 = nutriInfo[72].percentage;
        changeText(info1, info2);
        ind = 72;
        break;

        case 'st9-28':
        ind = 0;
        info1 = nutriInfo[73].name;
        info2 = nutriInfo[73].percentage;
        changeText(info1, info2);
        ind = 73;
        break;

        case 'st9-16':
        ind = 0;
        info1 = nutriInfo[74].name;
        info2 = nutriInfo[74].percentage;
        changeText(info1, info2);
        ind = 74;
        break;

        case 'st9-36':
        ind = 0;
        info1 = nutriInfo[75].name;
        info2 = nutriInfo[75].percentage;
        changeText(info1, info2);
        ind = 75;
        break;
        
        case 'st9-26':
        ind = 0;
        info1 = nutriInfo[76].name;
        info2 = nutriInfo[76].percentage;
        changeText(info1, info2);
        ind = 76;
        break;

        case 'st9-39':
        ind = 0;
        info1 = nutriInfo[77].name;
        info2 = nutriInfo[77].percentage;
        changeText(info1, info2);
        ind = 77;
        break;

        case 'st9-18':
        ind = 0;
        info1 = nutriInfo[78].name;
        info2 = nutriInfo[78].percentage;
        changeText(info1, info2);
        ind = 78;
        break;

        case 'st9-19':
        ind = 0;
        info1 = nutriInfo[79].name;
        info2 = nutriInfo[79].percentage;
        changeText(info1, info2);
        ind = 79;
        break;

        case 'st9-23':
        ind = 0;
        info1 = nutriInfo[80].name;
        info2 = nutriInfo[80].percentage;
        changeText(info1, info2);
        ind = 80;
        break;

        case 'st9-24':
        ind = 0;
        info1 = nutriInfo[81].name;
        info2 = nutriInfo[81].percentage;
        changeText(info1, info2);
        ind = 81;
        break;

        case 'st9-18':
        ind = 0;
        info1 = nutriInfo[82].name;
        info2 = nutriInfo[82].percentage;
        changeText(info1, info2);
        ind = 82;
        break;

        case 'st9-21':
        ind = 0;
        info1 = nutriInfo[83].name;
        info2 = nutriInfo[83].percentage;
        changeText(info1, info2);
        ind = 83;
        break;

        case 'st9-22':
        ind = 0;
        info1 = nutriInfo[84].name;
        info2 = nutriInfo[84].percentage;
        changeText(info1, info2);
        ind = 84;
        break;

        case 'st10-28':
        ind = 0;
        info1 = nutriInfo[85].name;
        info2 = nutriInfo[85].percentage;
        changeText(info1, info2);
        ind = 85;
        break;

        case 'st10-32':
        ind = 0;
        info1 = nutriInfo[86].name;
        info2 = nutriInfo[86].percentage;
        changeText(info1, info2);
        ind = 86;
        break;

        case 'st10-29':
        ind = 0;
        info1 = nutriInfo[87].name;
        info2 = nutriInfo[87].percentage;
        changeText(info1, info2);
        ind = 87;
        break;

        case 'st10-26':
        ind = 0;
        info1 = nutriInfo[88].name;
        info2 = nutriInfo[88].percentage;
        changeText(info1, info2);
        ind = 88;
        break;

        case 'st10-41':
        ind = 0;
        info1 = nutriInfo[89].name;
        info2 = nutriInfo[89].percentage;
        changeText(info1, info2);
        ind = 89;
        break;

        case 'st10-19':
        ind = 0;
        info1 = nutriInfo[90].name;
        info2 = nutriInfo[90].percentage;
        changeText(info1, info2);
        ind = 90;
        break;

        case 'st10-24':
        ind = 0;
        info1 = nutriInfo[91].name;
        info2 = nutriInfo[91].percentage;
        changeText(info1, info2);
        ind = 91;
        break;

        case 'st11-16':
        ind = 0;
        info1 = nutriInfo[92].name;
        info2 = nutriInfo[92].percentage;
        changeText(info1, info2);
        ind = 92;
        break;

        case 'st11-31':
        ind = 0;
        info1 = nutriInfo[93].name;
        info2 = nutriInfo[93].percentage;
        changeText(info1, info2);
        ind = 93;
        break;

        case 'st11-19':
        ind = 0;
        info1 = nutriInfo[94].name;
        info2 = nutriInfo[94].percentage;
        changeText(info1, info2);
        ind = 94;
        break;

        case 'st11-24':
        ind = 0;
        info1 = nutriInfo[95].name;
        info2 = nutriInfo[95].percentage;
        changeText(info1, info2);
        ind = 95;
        break;

        case 'st11-22':
        ind = 0;
        info1 = nutriInfo[96].name;
        info2 = nutriInfo[96].percentage;
        changeText(info1, info2);
        ind = 96;
        break;

        case 'st12-16':
        ind = 0;
        info1 = nutriInfo[97].name;
        info2 = nutriInfo[97].percentage;
        changeText(info1, info2);
        ind = 97;
        break;

        case 'st12-32':
        ind = 0;
        info1 = nutriInfo[98].name;
        info2 = nutriInfo[98].percentage;
        changeText(info1, info2);
        ind = 98;
        break;

        case 'st12-29':
        ind = 0;
        info1 = nutriInfo[99].name;
        info2 = nutriInfo[99].percentage;
        changeText(info1, info2);
        ind = 99;
        break;

        case 'st12-31':
        ind = 0;
        info1 = nutriInfo[100].name;
        info2 = nutriInfo[100].percentage;
        changeText(info1, info2);
        ind = 100;
        break;

        case 'st12-30':
        ind = 0;
        info1 = nutriInfo[101].name;
        info2 = nutriInfo[101].percentage;
        changeText(info1, info2);
        ind = 101;
        break;

        case 'st12-26':
        ind = 0;
        info1 = nutriInfo[102].name;
        info2 = nutriInfo[102].percentage;
        changeText(info1, info2);
        ind = 102;
        break;

        case 'st12-34':
        ind = 0;
        info1 = nutriInfo[103].name;
        info2 = nutriInfo[103].percentage;
        changeText(info1, info2);
        ind = 103;
        break;

        case 'st12-18':
        ind = 0;
        info1 = nutriInfo[104].name;
        info2 = nutriInfo[104].percentage;
        changeText(info1, info2);
        ind = 104;
        break;

        case 'st12-19':
        ind = 0;
        info1 = nutriInfo[105].name;
        info2 = nutriInfo[105].percentage;
        changeText(info1, info2);
        ind = 105;
        break;

        case 'st12-24':
        ind = 0;
        info1 = nutriInfo[106].name;
        info2 = nutriInfo[106].percentage;
        changeText(info1, info2);
        ind = 106;
        break;

        case 'st12-21':
        ind = 0;
        info1 = nutriInfo[107].name;
        info2 = nutriInfo[107].percentage;
        changeText(info1, info2);
        ind = 107;
        break;

        case 'st12-22':
        ind = 0;
        info1 = nutriInfo[108].name;
        info2 = nutriInfo[108].percentage;
        changeText(info1, info2);
        ind = 108;
        break;

        case 'st13-16':
        ind = 0;
        info1 = nutriInfo[109].name;
        info2 = nutriInfo[109].percentage;
        changeText(info1, info2);
        ind = 109;
        break;

        case 'st13-32':
        ind = 0;
        info1 = nutriInfo[110].name;
        info2 = nutriInfo[110].percentage;
        changeText(info1, info2);
        ind = 110;
        break;

        case 'st13-29':
        ind = 0;
        info1 = nutriInfo[111].name;
        info2 = nutriInfo[111].percentage;
        changeText(info1, info2);
        ind = 111;
        break;

        case 'st13-31':
        ind = 0;
        info1 = nutriInfo[112].name;
        info2 = nutriInfo[112].percentage;
        changeText(info1, info2);
        ind = 112;
        break;

        case 'st13-22':
        ind = 0;
        info1 = nutriInfo[113].name;
        info2 = nutriInfo[113].percentage;
        changeText(info1, info2);
        ind = 113;
        break;

        case 'st14-28':
        ind = 0;
        info1 = nutriInfo[114].name;
        info2 = nutriInfo[114].percentage;
        changeText(info1, info2);
        ind = 114;
        break;

        case 'st14-16':
        ind = 0;
        info1 = nutriInfo[115].name;
        info2 = nutriInfo[115].percentage;
        changeText(info1, info2);
        ind = 115;
        break;

        case 'st14-17':
        ind = 0;
        info1 = nutriInfo[116].name;
        info2 = nutriInfo[116].percentage;
        changeText(info1, info2);
        ind = 116;
        break;

        case 'st14-32':
        ind = 0;
        info1 = nutriInfo[117].name;
        info2 = nutriInfo[117].percentage;
        changeText(info1, info2);
        ind = 117;
        break;

        case 'st14-29':
        ind = 0;
        info1 = nutriInfo[118].name;
        info2 = nutriInfo[118].percentage;
        changeText(info1, info2);
        ind = 118;
        break;

        case 'st14-36':
        ind = 0;
        info1 = nutriInfo[119].name;
        info2 = nutriInfo[119].percentage;
        changeText(info1, info2);
        ind = 119;
        break;

        case 'st14-30':
        ind = 0;
        info1 = nutriInfo[120].name;
        info2 = nutriInfo[120].percentage;
        changeText(info1, info2);
        ind = 120;
        break;

        case 'st14-26':
        ind = 0;
        info1 = nutriInfo[121].name;
        info2 = nutriInfo[121].percentage;
        changeText(info1, info2);
        ind = 121;
        break;

        case 'st14-41':
        ind = 0;
        info1 = nutriInfo[122].name;
        info2 = nutriInfo[122].percentage;
        changeText(info1, info2);
        ind = 122;
        break;

        case 'st14-19':
        ind = 0;
        info1 = nutriInfo[123].name;
        info2 = nutriInfo[123].percentage;
        changeText(info1, info2);
        ind = 123;
        break;

        case 'st14-23':
        ind = 0;
        info1 = nutriInfo[124].name;
        info2 = nutriInfo[124].percentage;
        changeText(info1, info2);
        ind = 124;
        break;

        case 'st14-24':
        ind = 0;
        info1 = nutriInfo[125].name;
        info2 = nutriInfo[125].percentage;
        changeText(info1, info2);
        ind = 125;
        break;

        case 'st14-21':
        ind = 0;
        info1 = nutriInfo[126].name;
        info2 = nutriInfo[126].percentage;
        changeText(info1, info2);
        ind = 126;
        break;
        
        case 'st14-22':
        ind = 0;
        info1 = nutriInfo[127].name;
        info2 = nutriInfo[127].percentage;
        changeText(info1, info2);
        ind = 127;
        break;

        case 'st15-14':
        ind = 0;
        info1 = nutriInfo[128].name;
        info2 = nutriInfo[128].percentage;
        changeText(info1, info2);
        ind = 128;
        break;

        case 'st15-20':
        ind = 0;
        info1 = nutriInfo[129].name;
        info2 = nutriInfo[129].percentage;
        changeText(info1, info2);
        ind = 129;
        break;

        case 'st15-25':
        ind = 0;
        info1 = nutriInfo[130].name;
        info2 = nutriInfo[130].percentage;
        changeText(info1, info2);
        ind = 130;
        break;

        case 'st15-32':
        ind = 0;
        info1 = nutriInfo[131].name;
        info2 = nutriInfo[131].percentage;
        changeText(info1, info2);
        ind = 131;
        break;

        case 'st15-36':
        ind = 0;
        info1 = nutriInfo[132].name;
        info2 = nutriInfo[132].percentage;
        changeText(info1, info2);
        ind = 132;
        break;

        case 'st15-30':
        ind = 0;
        info1 = nutriInfo[133].name;
        info2 = nutriInfo[133].percentage;
        changeText(info1, info2);
        ind = 133;
        break;

        case 'st15-33':
        ind = 0;
        info1 = nutriInfo[134].name;
        info2 = nutriInfo[134].percentage;
        changeText(info1, info2);
        ind = 134;
        break;

        case 'st15-26':
        ind = 0;
        info1 = nutriInfo[135].name;
        info2 = nutriInfo[135].percentage;
        changeText(info1, info2);
        ind = 135;
        break;

        case 'st15-39':
        ind = 0;
        info1 = nutriInfo[136].name;
        info2 = nutriInfo[136].percentage;
        changeText(info1, info2);
        ind = 136;
        break;

        case 'st15-41':
        ind = 0;
        info1 = nutriInfo[137].name;
        info2 = nutriInfo[137].percentage;
        changeText(info1, info2);
        ind = 137;
        break;

        case 'st15-18':
        ind = 0;
        info1 = nutriInfo[138].name;
        info2 = nutriInfo[138].percentage;
        changeText(info1, info2);
        ind = 138;
        break;

        case 'st15-19':
        ind = 0;
        info1 = nutriInfo[139].name;
        info2 = nutriInfo[139].percentage;
        changeText(info1, info2);
        ind = 139;
        break;

        case 'st15-23':
        ind = 0;
        info1 = nutriInfo[140].name;
        info2 = nutriInfo[140].percentage;
        changeText(info1, info2);
        ind = 140;
        break;

        case 'st15-24':
        ind = 0;
        info1 = nutriInfo[141].name;
        info2 = nutriInfo[141].percentage;
        changeText(info1, info2);
        ind = 141;
        break;

        case 'st15-42':
        ind = 0;
        info1 = nutriInfo[142].name;
        info2 = nutriInfo[142].percentage;
        changeText(info1, info2);
        ind = 142;
        break;

        case 'st16-14':
        ind = 0;
        info1 = nutriInfo[143].name;
        info2 = nutriInfo[143].percentage;
        changeText(info1, info2);
        ind = 143;
        break;

        case 'st16-38':
        ind = 0;
        info1 = nutriInfo[144].name;
        info2 = nutriInfo[144].percentage;
        changeText(info1, info2);
        ind = 144;
        break;

        case 'st16-35':
        ind = 0;
        info1 = nutriInfo[145].name;
        info2 = nutriInfo[145].percentage;
        changeText(info1, info2);
        ind = 145;
        break;

        case 'st16-36':
        ind = 0;
        info1 = nutriInfo[146].name;
        info2 = nutriInfo[146].percentage;
        changeText(info1, info2);
        ind = 146;
        break;

        case 'st16-30':
        ind = 0;
        info1 = nutriInfo[147].name;
        info2 = nutriInfo[147].percentage;
        changeText(info1, info2);
        ind = 147;
        break;

        case 'st16-33':
        ind = 0;
        info1 = nutriInfo[148].name;
        info2 = nutriInfo[148].percentage;
        changeText(info1, info2);
        ind = 148;
        break;

        case 'st16-26':
        ind = 0;
        info1 = nutriInfo[149].name;
        info2 = nutriInfo[149].percentage;
        changeText(info1, info2);
        ind = 149;
        break;

        case 'st16-39':
        ind = 0;
        info1 = nutriInfo[150].name;
        info2 = nutriInfo[150].percentage;
        changeText(info1, info2);
        ind = 150;
        break;

        case 'st16-41':
        ind = 0;
        info1 = nutriInfo[151].name;
        info2 = nutriInfo[151].percentage;
        changeText(info1, info2);
        ind = 151;
        break;

        case 'st16-34':
        ind = 0;
        info1 = nutriInfo[152].name;
        info2 = nutriInfo[152].percentage;
        changeText(info1, info2);
        ind = 152;
        break;

        case 'st16-18':
        ind = 0;
        info1 = nutriInfo[153].name;
        info2 = nutriInfo[153].percentage;
        changeText(info1, info2);
        ind = 153;
        break;

        case 'st16-19':
        ind = 0;
        info1 = nutriInfo[154].name;
        info2 = nutriInfo[154].percentage;
        changeText(info1, info2);
        ind = 154;
        break;

        case 'st16-23':
        ind = 0;
        info1 = nutriInfo[155].name;
        info2 = nutriInfo[155].percentage;
        changeText(info1, info2);
        ind = 155;
        break;

        case 'st16-24':
        ind = 0;
        info1 = nutriInfo[156].name;
        info2 = nutriInfo[156].percentage;
        changeText(info1, info2);
        ind = 156;
        break;

        case 'st16-240':
        ind = 0;
        info1 = nutriInfo[157].name;
        info2 = nutriInfo[157].percentage;
        changeText(info1, info2);
        ind = 157;
        break;

        case 'st16-18':
        ind = 0;
        info1 = nutriInfo[158].name;
        info2 = nutriInfo[158].percentage;
        changeText(info1, info2);
        ind = 158;
        break;

        case 'st16-21':
        ind = 0;
        info1 = nutriInfo[159].name;
        info2 = nutriInfo[159].percentage;
        changeText(info1, info2);
        ind = 159;
        break;

        case 'st16-22':
        ind = 0;
        info1 = nutriInfo[160].name;
        info2 = nutriInfo[160].percentage;
        changeText(info1, info2);
        ind = 160;
        break;

        case 'st16-42':
        ind = 0;
        info1 = nutriInfo[161].name;
        info2 = nutriInfo[161].percentage;
        changeText(info1, info2);
        ind = 161;
        break;

        case 'st17-14':
        ind = 0;
        info1 = nutriInfo[162].name;
        info2 = nutriInfo[162].percentage;
        changeText(info1, info2);
        ind = 162;
        break;

        case 'st17-20':
        ind = 0;
        info1 = nutriInfo[163].name;
        info2 = nutriInfo[163].percentage;
        changeText(info1, info2);
        ind = 163;
        break;

        case 'st17-25':
        ind = 0;
        info1 = nutriInfo[164].name;
        info2 = nutriInfo[164].percentage;
        changeText(info1, info2);
        ind = 164;
        break;

        case 'st17-36':
        ind = 0;
        info1 = nutriInfo[165].name;
        info2 = nutriInfo[165].percentage;
        changeText(info1, info2);
        ind = 165;
        break;

        case 'st17-30':
        ind = 0;
        info1 = nutriInfo[166].name;
        info2 = nutriInfo[166].percentage;
        changeText(info1, info2);
        ind = 166;
        break;

        case 'st17-33':
        ind = 0;
        info1 = nutriInfo[167].name;
        info2 = nutriInfo[167].percentage;
        changeText(info1, info2);
        ind = 167;
        break;

        case 'st17-26':
        ind = 0;
        info1 = nutriInfo[168].name;
        info2 = nutriInfo[168].percentage;
        changeText(info1, info2);
        ind = 168;
        break;

        case 'st17-39':
        ind = 0;
        info1 = nutriInfo[169].name;
        info2 = nutriInfo[169].percentage;
        changeText(info1, info2);
        ind = 169;
        break;

        case 'st17-41':
        ind = 0;
        info1 = nutriInfo[170].name;
        info2 = nutriInfo[170].percentage;
        changeText(info1, info2);
        ind = 170;
        break;

        case 'st17-34':
        ind = 0;
        info1 = nutriInfo[171].name;
        info2 = nutriInfo[171].percentage;
        changeText(info1, info2);
        ind = 171;
        break;

        case 'st17-19':
        ind = 0;
        info1 = nutriInfo[172].name;
        info2 = nutriInfo[172].percentage;
        changeText(info1, info2);
        ind = 172;
        break;

        case 'st17-23':
        ind = 0;
        info1 = nutriInfo[173].name;
        info2 = nutriInfo[173].percentage;
        changeText(info1, info2);
        ind = 173;
        break;

        case 'st17-24':
        ind = 0;
        info1 = nutriInfo[174].name;
        info2 = nutriInfo[174].percentage;
        changeText(info1, info2);
        ind = 174;
        break;

        case 'st17-18':
        ind = 0;
        info1 = nutriInfo[175].name;
        info2 = nutriInfo[175].percentage;
        changeText(info1, info2);
        ind = 175;
        break;

        case 'st17-22':
        ind = 0;
        info1 = nutriInfo[176].name;
        info2 = nutriInfo[176].percentage;
        changeText(info1, info2);
        ind = 176;
        break;

        case 'st17-42':
        ind = 0;
        info1 = nutriInfo[177].name;
        info2 = nutriInfo[177].percentage;
        changeText(info1, info2);
        ind = 177;
        break;

        case 'st18-14':
        ind = 0;
        info1 = nutriInfo[178].name;
        info2 = nutriInfo[178].percentage;
        changeText(info1, info2);
        ind = 178;
        break;

        case 'st18-25':
        ind = 0;
        info1 = nutriInfo[179].name;
        info2 = nutriInfo[179].percentage;
        changeText(info1, info2);
        ind = 179;
        break;

        case 'st18-30':
        ind = 0;
        info1 = nutriInfo[180].name;
        info2 = nutriInfo[180].percentage;
        changeText(info1, info2);
        ind = 180;
        break;

        case 'st18-33':
        ind = 0;
        info1 = nutriInfo[181].name;
        info2 = nutriInfo[181].percentage;
        changeText(info1, info2);
        ind = 181;
        break;

        case 'st18-26':
        ind = 0;
        info1 = nutriInfo[182].name;
        info2 = nutriInfo[182].percentage;
        changeText(info1, info2);
        ind = 182;
        break;

        case 'st18-39':
        ind = 0;
        info1 = nutriInfo[183].name;
        info2 = nutriInfo[183].percentage;
        changeText(info1, info2);
        ind = 183;
        break;

        case 'st18-41':
        ind = 0;
        info1 = nutriInfo[184].name;
        info2 = nutriInfo[184].percentage;
        changeText(info1, info2);
        ind = 184;
        break;

        case 'st18-34':
        ind = 0;
        info1 = nutriInfo[185].name;
        info2 = nutriInfo[185].percentage;
        changeText(info1, info2);
        ind = 185;
        break;

        case 'st18-18':
        ind = 0;
        info1 = nutriInfo[186].name;
        info2 = nutriInfo[186].percentage;
        changeText(info1, info2);
        ind = 186;
        break;

        case 'st18-19':
        ind = 0;
        info1 = nutriInfo[187].name;
        info2 = nutriInfo[187].percentage;
        changeText(info1, info2);
        ind = 187;
        break;

        case 'st18-23':
        ind = 0;
        info1 = nutriInfo[188].name;
        info2 = nutriInfo[188].percentage;
        changeText(info1, info2);
        ind = 188;
        break;

        case 'st18-24':
        ind = 0;
        info1 = nutriInfo[189].name;
        info2 = nutriInfo[189].percentage;
        changeText(info1, info2);
        ind = 189;
        break;

        case 'st18-180':
        ind = 0;
        info1 = nutriInfo[190].name;
        info2 = nutriInfo[190].percentage;
        changeText(info1, info2);
        ind = 190;
        break;

        case 'st18-42':
        ind = 0;
        info1 = nutriInfo[191].name;
        info2 = nutriInfo[191].percentage;
        changeText(info1, info2);
        ind = 191;
        break;

        case 'st19-14':
        ind = 0;
        info1 = nutriInfo[192].name;
        info2 = nutriInfo[192].percentage;
        changeText(info1, info2);
        ind = 192;
        break;

        case 'st19-25':
        ind = 0;
        info1 = nutriInfo[193].name;
        info2 = nutriInfo[193].percentage;
        changeText(info1, info2);
        ind = 193;
        break;

        case 'st19-30':
        ind = 0;
        info1 = nutriInfo[194].name;
        info2 = nutriInfo[194].percentage;
        changeText(info1, info2);
        ind = 194;
        break;

        case 'st19-33':
        ind = 0;
        info1 = nutriInfo[195].name;
        info2 = nutriInfo[195].percentage;
        changeText(info1, info2);
        ind = 195;
        break;

        case 'st19-26':
        ind = 0;
        info1 = nutriInfo[196].name;
        info2 = nutriInfo[196].percentage;
        changeText(info1, info2);
        ind = 196;
        break;

        case 'st19-39':
        ind = 0;
        info1 = nutriInfo[197].name;
        info2 = nutriInfo[197].percentage;
        changeText(info1, info2);
        ind = 197;
        break;

        case 'st19-41':
        ind = 0;
        info1 = nutriInfo[198].name;
        info2 = nutriInfo[198].percentage;
        changeText(info1, info2);
        ind = 198;
        break;

        case 'st19-34':
        ind = 0;
        info1 = nutriInfo[199].name;
        info2 = nutriInfo[199].percentage;
        changeText(info1, info2);
        ind = 199;
        break;

        case 'st19-18':
        ind = 0;
        info1 = nutriInfo[200].name;
        info2 = nutriInfo[200].percentage;
        changeText(info1, info2);
        ind = 200;
        break;

        case 'st19-19':
        ind = 0;
        info1 = nutriInfo[201].name;
        info2 = nutriInfo[201].percentage;
        changeText(info1, info2);
        ind = 201;
        break;

        case 'st19-23':
        ind = 0;
        info1 = nutriInfo[202].name;
        info2 = nutriInfo[202].percentage;
        changeText(info1, info2);
        ind = 202;
        break;

        case 'st19-24':
        ind = 0;
        info1 = nutriInfo[203].name;
        info2 = nutriInfo[203].percentage;
        changeText(info1, info2);
        ind = 203;
        break;

        case 'st19-18':
        ind = 0;
        info1 = nutriInfo[204].name;
        info2 = nutriInfo[204].percentage;
        changeText(info1, info2);
        ind = 204;
        break;

        case 'st19-42':
        ind = 0;
        info1 = nutriInfo[205].name;
        info2 = nutriInfo[205].percentage;
        changeText(info1, info2);
        ind = 205;
        break;

        case 'st20-14':
        ind = 0;
        info1 = nutriInfo[206].name;
        info2 = nutriInfo[206].percentage;
        changeText(info1, info2);
        ind = 206;
        break;

        case 'st20-25':
        ind = 0;
        info1 = nutriInfo[207].name;
        info2 = nutriInfo[207].percentage;
        changeText(info1, info2);
        ind = 207;
        break;

        case 'st20-30':
        ind = 0;
        info1 = nutriInfo[208].name;
        info2 = nutriInfo[208].percentage;
        changeText(info1, info2);
        ind = 208;
        break;

        case 'st20-33':
        ind = 0;
        info1 = nutriInfo[209].name;
        info2 = nutriInfo[209].percentage;
        changeText(info1, info2);
        ind = 209;
        break;

        case 'st20-26':
        ind = 0;
        info1 = nutriInfo[210].name;
        info2 = nutriInfo[210].percentage;
        changeText(info1, info2);
        ind = 210;
        break;

        case 'st20-39':
        ind = 0;
        info1 = nutriInfo[211].name;
        info2 = nutriInfo[211].percentage;
        changeText(info1, info2);
        ind = 211;
        break;

        case 'st20-41':
        ind = 0;
        info1 = nutriInfo[212].name;
        info2 = nutriInfo[212].percentage;
        changeText(info1, info2);
        ind = 212;
        break;

        case 'st20-18':
        ind = 0;
        info1 = nutriInfo[213].name;
        info2 = nutriInfo[213].percentage;
        changeText(info1, info2);
        ind = 213;
        break;

        case 'st20-19':
        ind = 0;
        info1 = nutriInfo[214].name;
        info2 = nutriInfo[214].percentage;
        changeText(info1, info2);
        ind = 214;
        break;

        case 'st20-23':
        ind = 0;
        info1 = nutriInfo[215].name;
        info2 = nutriInfo[215].percentage;
        changeText(info1, info2);
        ind = 215;
        break;

        case 'st20-24':
        ind = 0;
        info1 = nutriInfo[216].name;
        info2 = nutriInfo[216].percentage;
        changeText(info1, info2);
        ind = 216;
        break;

        case 'st20-180':
        ind = 0;
        info1 = nutriInfo[217].name;
        info2 = nutriInfo[217].percentage;
        changeText(info1, info2);
        ind = 217;
        break;

        case 'st20-42':
        ind = 0;
        info1 = nutriInfo[218].name;
        info2 = nutriInfo[218].percentage;
        changeText(info1, info2);
        ind = 218;
        break;

        case 'st21-14':
        ind = 0;
        info1 = nutriInfo[219].name;
        info2 = nutriInfo[219].percentage;
        changeText(info1, info2);
        ind = 219;
        break;

        case 'st21-16':
        ind = 0;
        info1 = nutriInfo[220].name;
        info2 = nutriInfo[220].percentage;
        changeText(info1, info2);
        ind = 220;
        break;

        case 'st21-20':
        ind = 0;
        info1 = nutriInfo[221].name;
        info2 = nutriInfo[221].percentage;
        changeText(info1, info2);
        ind = 221;
        break;

        case 'st21-25':
        ind = 0;
        info1 = nutriInfo[222].name;
        info2 = nutriInfo[222].percentage;
        changeText(info1, info2);
        ind = 222;
        break;

        case 'st21-34':
        ind = 0;
        info1 = nutriInfo[223].name;
        info2 = nutriInfo[223].percentage;
        changeText(info1, info2);
        ind = 223;
        break;

        case 'st21-18':
        ind = 0;
        info1 = nutriInfo[224].name;
        info2 = nutriInfo[224].percentage;
        changeText(info1, info2);
        ind = 224;
        break;

        case 'st21-22':
        ind = 0;
        info1 = nutriInfo[225].name;
        info2 = nutriInfo[225].percentage;
        changeText(info1, info2);
        ind = 225;
        break;

        case 'st22-28':
        ind = 0;
        info1 = nutriInfo[226].name;
        info2 = nutriInfo[226].percentage;
        changeText(info1, info2);
        ind = 226;
        break;

        case 'st22-16':
        ind = 0;
        info1 = nutriInfo[227].name;
        info2 = nutriInfo[227].percentage;
        changeText(info1, info2);
        ind = 227;
        break;

        case 'st22-17':
        ind = 0;
        info1 = nutriInfo[228].name;
        info2 = nutriInfo[228].percentage;
        changeText(info1, info2);
        ind = 228;
        break;

        case 'st22-25':
        ind = 0;
        info1 = nutriInfo[229].name;
        info2 = nutriInfo[229].percentage;
        changeText(info1, info2);
        ind = 229;
        break;

        case 'st22-29':
        ind = 0;
        info1 = nutriInfo[230].name;
        info2 = nutriInfo[230].percentage;
        changeText(info1, info2);
        ind = 230;
        break;

        case 'st22-31':
        ind = 0;
        info1 = nutriInfo[231].name;
        info2 = nutriInfo[231].percentage;
        changeText(info1, info2);
        ind = 231;
        break;

        case 'st22-33':
        ind = 0;
        info1 = nutriInfo[232].name;
        info2 = nutriInfo[232].percentage;
        changeText(info1, info2);
        ind = 232;
        break;

        case 'st22-39':
        ind = 0;
        info1 = nutriInfo[233].name;
        info2 = nutriInfo[233].percentage;
        changeText(info1, info2);
        ind = 233;
        break;

        case 'st22-41':
        ind = 0;
        info1 = nutriInfo[234].name;
        info2 = nutriInfo[234].percentage;
        changeText(info1, info2);
        ind = 234;
        break;

        case 'st22-19':
        ind = 0;
        info1 = nutriInfo[235].name;
        info2 = nutriInfo[235].percentage;
        changeText(info1, info2);
        ind = 235;
        break;

        case 'st23-16':
        ind = 0;
        info1 = nutriInfo[236].name;
        info2 = nutriInfo[236].percentage;
        changeText(info1, info2);
        ind = 236;
        break;

        case 'st23-17':
        ind = 0;
        info1 = nutriInfo[237].name;
        info2 = nutriInfo[237].percentage;
        changeText(info1, info2);
        ind = 237;
        break;

        case 'st23-29':
        ind = 0;
        info1 = nutriInfo[238].name;
        info2 = nutriInfo[238].percentage;
        changeText(info1, info2);
        ind = 238;
        break;

        case 'st23-31':
        ind = 0;
        info1 = nutriInfo[239].name;
        info2 = nutriInfo[239].percentage;
        changeText(info1, info2);
        ind = 239;
        break;

        case 'st23-26':
        ind = 0;
        info1 = nutriInfo[240].name;
        info2 = nutriInfo[240].percentage;
        changeText(info1, info2);
        ind = 240;
        break;

        case 'st23-34':
        ind = 0;
        info1 = nutriInfo[241].name;
        info2 = nutriInfo[241].percentage;
        changeText(info1, info2);
        ind = 241;
        break;

        case 'st23-19':
        ind = 0;
        info1 = nutriInfo[242].name;
        info2 = nutriInfo[242].percentage;
        changeText(info1, info2);
        ind = 242;
        break;

        case 'st23-23':
        ind = 0;
        info1 = nutriInfo[243].name;
        info2 = nutriInfo[243].percentage;
        changeText(info1, info2);
        ind = 243;
        break;

        case 'st23-24':
        ind = 0;
        info1 = nutriInfo[244].name;
        info2 = nutriInfo[244].percentage;
        changeText(info1, info2);
        ind = 244;
        break;

        case 'st24-16':
        ind = 0;
        info1 = nutriInfo[245].name;
        info2 = nutriInfo[245].percentage;
        changeText(info1, info2);
        ind = 245;
        break;

        case 'st24-17':
        ind = 0;
        info1 = nutriInfo[246].name;
        info2 = nutriInfo[246].percentage;
        changeText(info1, info2);
        ind = 246;
        break;

        case 'st24-29':
        ind = 0;
        info1 = nutriInfo[247].name;
        info2 = nutriInfo[247].percentage;
        changeText(info1, info2);
        ind = 247;
        break;

        case 'st24-26':
        ind = 0;
        info1 = nutriInfo[248].name;
        info2 = nutriInfo[248].percentage;
        changeText(info1, info2);
        ind = 248;
        break;

        case 'st24-18':
        ind = 0;
        info1 = nutriInfo[249].name;
        info2 = nutriInfo[249].percentage;
        changeText(info1, info2);
        ind = 249;
        break;

        case 'st24-19':
        ind = 0;
        info1 = nutriInfo[250].name;
        info2 = nutriInfo[250].percentage;
        changeText(info1, info2);
        ind = 250;
        break;

        case 'st24-24':
        ind = 0;
        info1 = nutriInfo[251].name;
        info2 = nutriInfo[251].percentage;
        changeText(info1, info2);
        ind = 251;
        break;

        case 'st24-180':
        ind = 0;
        info1 = nutriInfo[252].name;
        info2 = nutriInfo[252].percentage;
        changeText(info1, info2);
        ind = 252;
        break;

        case 'st24-21':
        ind = 0;
        info1 = nutriInfo[253].name;
        info2 = nutriInfo[253].percentage;
        changeText(info1, info2);
        ind = 253;
        break;

        case 'st25-14':
        ind = 0;
        info1 = nutriInfo[254].name;
        info2 = nutriInfo[254].percentage;
        changeText(info1, info2);
        ind = 254;
        break;

        case 'st25-17':
        ind = 0;
        info1 = nutriInfo[255].name;
        info2 = nutriInfo[255].percentage;
        changeText(info1, info2);
        ind = 255;
        break;

        case 'st26-17':
        ind = 0;
        info1 = nutriInfo[256].name;
        info2 = nutriInfo[256].percentage;
        changeText(info1, info2);
        ind = 256;
        break;

        case 'st26-32':
        ind = 0;
        info1 = nutriInfo[257].name;
        info2 = nutriInfo[257].percentage;
        changeText(info1, info2);
        ind = 257;
        break;

        case 'st27-28':
        ind = 0;
        info1 = nutriInfo[258].name;
        info2 = nutriInfo[258].percentage;
        changeText(info1, info2);
        ind = 258;
        break;

        case 'st28-14':
        ind = 0;
        info1 = nutriInfo[259].name;
        info2 = nutriInfo[259].percentage;
        changeText(info1, info2);
        ind = 259;
        break;

        case 'st28-17':
        ind = 0;
        info1 = nutriInfo[260].name;
        info2 = nutriInfo[260].percentage;
        changeText(info1, info2);
        ind = 260;
        break;

        case 'st28-35':
        ind = 0;
        info1 = nutriInfo[261].name;
        info2 = nutriInfo[261].percentage;
        changeText(info1, info2);
        ind = 261;
        break;

        case 'st28-31':
        ind = 0;
        info1 = nutriInfo[262].name;
        info2 = nutriInfo[262].percentage;
        changeText(info1, info2);
        ind = 262;
        break;

        case 'st29-14':
        ind = 0;
        info1 = nutriInfo[263].name;
        info2 = nutriInfo[263].percentage;
        changeText(info1, info2);
        ind = 263;
        break;

        case 'st29-17':
        ind = 0;
        info1 = nutriInfo[264].name;
        info2 = nutriInfo[264].percentage;
        changeText(info1, info2);
        ind = 264;
        break;

        case 'st29-35':
        ind = 0;
        info1 = nutriInfo[265].name;
        info2 = nutriInfo[265].percentage;
        changeText(info1, info2);
        ind = 265;
        break;

        case 'st31-28':
        ind = 0;
        info1 = nutriInfo[266].name;
        info2 = nutriInfo[266].percentage;
        changeText(info1, info2);
        ind = 266;
        break;

        case 'st31-16':
        ind = 0;
        info1 = nutriInfo[267].name;
        info2 = nutriInfo[267].percentage;
        changeText(info1, info2);
        ind = 267;
        break;

        case 'st31-17':
        ind = 0;
        info1 = nutriInfo[268].name;
        info2 = nutriInfo[268].percentage;
        changeText(info1, info2);
        ind = 268;
        break;

        case 'st31-32':
        ind = 0;
        info1 = nutriInfo[269].name;
        info2 = nutriInfo[269].percentage;
        changeText(info1, info2);
        ind = 269;
        break;

        case 'st31-29':
        ind = 0;
        info1 = nutriInfo[270].name;
        info2 = nutriInfo[270].percentage;
        changeText(info1, info2);
        ind = 270;
        break;

        case 'st31-35':
        ind = 0;
        info1 = nutriInfo[271].name;
        info2 = nutriInfo[271].percentage;
        changeText(info1, info2);
        ind = 271;
        break;

        case 'st31-31':
        ind = 0;
        info1 = nutriInfo[272].name;
        info2 = nutriInfo[272].percentage;
        changeText(info1, info2);
        ind = 272;
        break;

        case 'st31-18':
        ind = 0;
        info1 = nutriInfo[273].name;
        info2 = nutriInfo[273].percentage;
        changeText(info1, info2);
        ind = 273;
        break;

        case 'st31-24':
        ind = 0;
        info1 = nutriInfo[274].name;
        info2 = nutriInfo[274].percentage;
        changeText(info1, info2);
        ind = 274;
        break;

        case 'st32-14':
        ind = 0;
        info1 = nutriInfo[275].name;
        info2 = nutriInfo[275].percentage;
        changeText(info1, info2);
        ind = 275;
        break;

        case 'st32-17':
        ind = 0;
        info1 = nutriInfo[276].name;
        info2 = nutriInfo[276].percentage;
        changeText(info1, info2);
        ind = 276;
        break;

        case 'st32-20':
        ind = 0;
        info1 = nutriInfo[277].name;
        info2 = nutriInfo[277].percentage;
        changeText(info1, info2);
        ind = 277;
        break;

        case 'st32-25':
        ind = 0;
        info1 = nutriInfo[278].name;
        info2 = nutriInfo[278].percentage;
        changeText(info1, info2);
        ind = 278;
        break;

        case 'st32-32':
        ind = 0;
        info1 = nutriInfo[279].name;
        info2 = nutriInfo[279].percentage;
        changeText(info1, info2);
        ind = 279;
        break;

        case 'st32-36':
        ind = 0;
        info1 = nutriInfo[280].name;
        info2 = nutriInfo[280].percentage;
        changeText(info1, info2);
        ind = 280;
        break;

        case 'st32-30':
        ind = 0;
        info1 = nutriInfo[281].name;
        info2 = nutriInfo[281].percentage;
        changeText(info1, info2);
        ind = 281;
        break;

        case 'st32-39':
        ind = 0;
        info1 = nutriInfo[282].name;
        info2 = nutriInfo[282].percentage;
        changeText(info1, info2);
        ind = 282;
        break;

        case 'st32-41':
        ind = 0;
        info1 = nutriInfo[283].name;
        info2 = nutriInfo[283].percentage;
        changeText(info1, info2);
        ind = 283;
        break;

        case 'st32-34':
        ind = 0;
        info1 = nutriInfo[284].name;
        info2 = nutriInfo[284].percentage;
        changeText(info1, info2);
        ind = 284;
        break;

        case 'st32-19':
        ind = 0;
        info1 = nutriInfo[285].name;
        info2 = nutriInfo[285].percentage;
        changeText(info1, info2);
        ind = 285;
        break;

        case 'st32-23':
        ind = 0;
        info1 = nutriInfo[286].name;
        info2 = nutriInfo[286].percentage;
        changeText(info1, info2);
        ind = 286;
        break;

        case 'st32-24':
        ind = 0;
        info1 = nutriInfo[287].name;
        info2 = nutriInfo[287].percentage;
        changeText(info1, info2);
        ind = 287;
        break;

        case 'st32-240':
        ind = 0;
        info1 = nutriInfo[288].name;
        info2 = nutriInfo[288].percentage;
        changeText(info1, info2);
        ind = 288;
        break;

        case 'st32-18':
        ind = 0;
        info1 = nutriInfo[289].name;
        info2 = nutriInfo[289].percentage;
        changeText(info1, info2);
        ind = 289;
        break;

        case 'st32-42':
        ind = 0;
        info1 = nutriInfo[290].name;
        info2 = nutriInfo[290].percentage;
        changeText(info1, info2);
        ind = 290;
        break;

        case 'st33-14':
        ind = 0;
        info1 = nutriInfo[291].name;
        info2 = nutriInfo[291].percentage;
        changeText(info1, info2);
        ind = 291;
        break;

        case 'st33-28':
        ind = 0;
        info1 = nutriInfo[292].name;
        info2 = nutriInfo[292].percentage;
        changeText(info1, info2);
        ind = 292;
        break;

        case 'st33-16':
        ind = 0;
        info1 = nutriInfo[293].name;
        info2 = nutriInfo[293].percentage;
        changeText(info1, info2);
        ind = 293;
        break;

        case 'st33-17':
        ind = 0;
        info1 = nutriInfo[294].name;
        info2 = nutriInfo[294].percentage;
        changeText(info1, info2);
        ind = 294;
        break;

        case 'st33-25':
        ind = 0;
        info1 = nutriInfo[295].name;
        info2 = nutriInfo[295].percentage;
        changeText(info1, info2);
        ind = 295;
        break;

        case 'st33-29':
        ind = 0;
        info1 = nutriInfo[296].name;
        info2 = nutriInfo[296].percentage;
        changeText(info1, info2);
        ind = 296;
        break;

        case 'st33-36':
        ind = 0;
        info1 = nutriInfo[297].name;
        info2 = nutriInfo[297].percentage;
        changeText(info1, info2);
        ind = 297;
        break;

        case 'st33-30':
        ind = 0;
        info1 = nutriInfo[298].name;
        info2 = nutriInfo[298].percentage;
        changeText(info1, info2);
        ind = 298;
        break;

        case 'st33-360':
        ind = 0;
        info1 = nutriInfo[299].name;
        info2 = nutriInfo[299].percentage;
        changeText(info1, info2);
        ind = 299;
        break;

        case 'st33-26':
        ind = 0;
        info1 = nutriInfo[300].name;
        info2 = nutriInfo[300].percentage;
        changeText(info1, info2);
        ind = 300;
        break;

        case 'st33-39':
        ind = 0;
        info1 = nutriInfo[301].name;
        info2 = nutriInfo[301].percentage;
        changeText(info1, info2);
        ind = 301;
        break;

        case 'st33-34':
        ind = 0;
        info1 = nutriInfo[302].name;
        info2 = nutriInfo[302].percentage;
        changeText(info1, info2);
        ind = 302;
        break;

        case 'st33-23':
        ind = 0;
        info1 = nutriInfo[303].name;
        info2 = nutriInfo[303].percentage;
        changeText(info1, info2);
        ind = 303;
        break;

        case 'st33-24':
        ind = 0;
        info1 = nutriInfo[304].name;
        info2 = nutriInfo[304].percentage;
        changeText(info1, info2);
        ind = 304;
        break;

        case 'st33-230':
        ind = 0;
        info1 = nutriInfo[305].name;
        info2 = nutriInfo[305].percentage;
        changeText(info1, info2);
        ind = 305;
        break;

        case 'st33-22':
        ind = 0;
        info1 = nutriInfo[306].name;
        info2 = nutriInfo[306].percentage;
        changeText(info1, info2);
        ind = 306;
        break;

        case 'st33-42':
        ind = 0;
        info1 = nutriInfo[307].name;
        info2 = nutriInfo[307].percentage;
        changeText(info1, info2);
        ind = 307;
        break;

        case 'st34-31':
        ind = 0;
        info1 = nutriInfo[308].name;
        info2 = nutriInfo[308].percentage;
        changeText(info1, info2);
        ind = 308;
        break;

        case 'st34-24':
        ind = 0;
        info1 = nutriInfo[309].name;
        info2 = nutriInfo[309].percentage;
        changeText(info1, info2);
        ind = 309;
        break;

        case 'st34-21':
        ind = 0;
        info1 = nutriInfo[310].name;
        info2 = nutriInfo[310].percentage;
        changeText(info1, info2);
        ind = 310;
        break;

        case 'st34-22':
        ind = 0;
        info1 = nutriInfo[311].name;
        info2 = nutriInfo[311].percentage;
        changeText(info1, info2);
        ind = 311;
        break;

        case 'st35-16':
        ind = 0;
        info1 = nutriInfo[312].name;
        info2 = nutriInfo[312].percentage;
        changeText(info1, info2);
        ind = 312;
        break;

        case 'st35-29':
        ind = 0;
        info1 = nutriInfo[313].name;
        info2 = nutriInfo[313].percentage;
        changeText(info1, info2);
        ind = 313;
        break;

        case 'st35-19':
        ind = 0;
        info1 = nutriInfo[314].name;
        info2 = nutriInfo[314].percentage;
        changeText(info1, info2);
        ind = 314;
        break;

        case 'st35-24':
        ind = 0;
        info1 = nutriInfo[315].name;
        info2 = nutriInfo[315].percentage;
        changeText(info1, info2);
        ind = 315;
        break;

        case 'st35-22':
        ind = 0;
        info1 = nutriInfo[316].name;
        info2 = nutriInfo[316].percentage;
        changeText(info1, info2);
        ind = 316;
        break;

        case 'st36-16':
        ind = 0;
        info1 = nutriInfo[317].name;
        info2 = nutriInfo[317].percentage;
        changeText(info1, info2);
        ind = 317;
        break;

        case 'st36-32':
        ind = 0;
        info1 = nutriInfo[318].name;
        info2 = nutriInfo[318].percentage;
        changeText(info1, info2);
        ind = 318;
        break;

        case 'st36-29':
        ind = 0;
        info1 = nutriInfo[319].name;
        info2 = nutriInfo[319].percentage;
        changeText(info1, info2);
        ind = 319;
        break;

        case 'st36-31':
        ind = 0;
        info1 = nutriInfo[320].name;
        info2 = nutriInfo[320].percentage;
        changeText(info1, info2);
        ind = 320;
        break;

        case 'st36-36':
        ind = 0;
        info1 = nutriInfo[321].name;
        info2 = nutriInfo[321].percentage;
        changeText(info1, info2);
        ind = 321;
        break;

        case 'st36-30':
        ind = 0;
        info1 = nutriInfo[322].name;
        info2 = nutriInfo[322].percentage;
        changeText(info1, info2);
        ind = 322;
        break;

        case 'st36-18':
        ind = 0;
        info1 = nutriInfo[323].name;
        info2 = nutriInfo[323].percentage;
        changeText(info1, info2);
        ind = 323;
        break;

        case 'st36-19':
        ind = 0;
        info1 = nutriInfo[324].name;
        info2 = nutriInfo[324].percentage;
        changeText(info1, info2);
        ind = 324;
        break;

        case 'st36-24':
        ind = 0;
        info1 = nutriInfo[325].name;
        info2 = nutriInfo[325].percentage;
        changeText(info1, info2);
        ind = 325;
        break;

        case 'st36-22':
        ind = 0;
        info1 = nutriInfo[326].name;
        info2 = nutriInfo[326].percentage;
        changeText(info1, info2);
        ind = 326;
        break;

        case 'st37-14':
        ind = 0;
        info1 = nutriInfo[327].name;
        info2 = nutriInfo[327].percentage;
        changeText(info1, info2);
        ind = 327;
        break;

        case 'st37-28':
        ind = 0;
        info1 = nutriInfo[328].name;
        info2 = nutriInfo[328].percentage;
        changeText(info1, info2);
        ind = 328;
        break;

        case 'st37-16':
        ind = 0;
        info1 = nutriInfo[329].name;
        info2 = nutriInfo[329].percentage;
        changeText(info1, info2);
        ind = 329;
        break;

        case 'st37-25':
        ind = 0;
        info1 = nutriInfo[330].name;
        info2 = nutriInfo[330].percentage;
        changeText(info1, info2);
        ind = 330;
        break;

        case 'st37-36':
        ind = 0;
        info1 = nutriInfo[331].name;
        info2 = nutriInfo[331].percentage;
        changeText(info1, info2);
        ind = 331;
        break;

        case 'st37-18':
        ind = 0;
        info1 = nutriInfo[332].name;
        info2 = nutriInfo[332].percentage;
        changeText(info1, info2);
        ind = 332;
        break;

        case 'st37-19':
        ind = 0;
        info1 = nutriInfo[333].name;
        info2 = nutriInfo[333].percentage;
        changeText(info1, info2);
        ind = 333;
        break;

        case 'st37-23':
        ind = 0;
        info1 = nutriInfo[334].name;
        info2 = nutriInfo[334].percentage;
        changeText(info1, info2);
        ind = 334;
        break;

        case 'st37-24':
        ind = 0;
        info1 = nutriInfo[335].name;
        info2 = nutriInfo[335].percentage;
        changeText(info1, info2);
        ind = 335;
        break;

        case 'st37-18':
        ind = 0;
        info1 = nutriInfo[336].name;
        info2 = nutriInfo[336].percentage;
        changeText(info1, info2);
        ind = 336;
        break;

        case 'st37-21':
        ind = 0;
        info1 = nutriInfo[337].name;
        info2 = nutriInfo[337].percentage;
        changeText(info1, info2);
        ind = 337;
        break;

        case 'st37-22':
        ind = 0;
        info1 = nutriInfo[338].name;
        info2 = nutriInfo[338].percentage;
        changeText(info1, info2);
        ind = 338;
        break;

        case 'st38-16':
        ind = 0;
        info1 = nutriInfo[339].name;
        info2 = nutriInfo[339].percentage;
        changeText(info1, info2);
        ind = 339;
        break;

        case 'st38-25':
        ind = 0;
        info1 = nutriInfo[340].name;
        info2 = nutriInfo[340].percentage;
        changeText(info1, info2);
        ind = 340;
        break;

        case 'st38-31':
        ind = 0;
        info1 = nutriInfo[341].name;
        info2 = nutriInfo[341].percentage;
        changeText(info1, info2);
        ind = 341;
        break;

        case 'st38-36':
        ind = 0;
        info1 = nutriInfo[342].name;
        info2 = nutriInfo[342].percentage;
        changeText(info1, info2);
        ind = 342;
        break;

        case 'st38-30':
        ind = 0;
        info1 = nutriInfo[343].name;
        info2 = nutriInfo[343].percentage;
        changeText(info1, info2);
        ind = 343;
        break;

        case 'st38-360':
        ind = 0;
        info1 = nutriInfo[344].name;
        info2 = nutriInfo[344].percentage;
        changeText(info1, info2);
        ind = 344;
        break;

        case 'st38-26':
        ind = 0;
        info1 = nutriInfo[345].name;
        info2 = nutriInfo[345].percentage;
        changeText(info1, info2);
        ind = 345;
        break;

        case 'st38-34':
        ind = 0;
        info1 = nutriInfo[346].name;
        info2 = nutriInfo[346].percentage;
        changeText(info1, info2);
        ind = 346;
        break;

        case 'st38-18':
        ind = 0;
        info1 = nutriInfo[347].name;
        info2 = nutriInfo[347].percentage;
        changeText(info1, info2);
        ind = 347;
        break;

        case 'st38-19':
        ind = 0;
        info1 = nutriInfo[348].name;
        info2 = nutriInfo[348].percentage;
        changeText(info1, info2);
        ind = 348;
        break;

        case 'st38-23':
        ind = 0;
        info1 = nutriInfo[349].name;
        info2 = nutriInfo[349].percentage;
        changeText(info1, info2);
        ind = 349;
        break;

        case 'st38-24':
        ind = 0;
        info1 = nutriInfo[350].name;
        info2 = nutriInfo[350].percentage;
        changeText(info1, info2);
        ind = 350;
        break;

        case 'st38-240':
        ind = 0;
        info1 = nutriInfo[351].name;
        info2 = nutriInfo[351].percentage;
        changeText(info1, info2);
        ind = 351;
        break;

        case 'st38-21':
        ind = 0;
        info1 = nutriInfo[352].name;
        info2 = nutriInfo[352].percentage;
        changeText(info1, info2);
        ind = 352;
        break;

        case 'st38-22':
        ind = 0;
        info1 = nutriInfo[353].name;
        info2 = nutriInfo[353].percentage;
        changeText(info1, info2);
        ind = 353;
        break;

        case 'st39-31':
        ind = 0;
        info1 = nutriInfo[354].name;
        info2 = nutriInfo[354].percentage;
        changeText(info1, info2);
        ind = 354;
        break;
        
        case 'st40-31':
        ind = 0;
        info1 = nutriInfo[355].name;
        info2 = nutriInfo[355].percentage;
        changeText(info1, info2);
        ind = 355;
        break;

        case 'st40-24':
        ind = 0;
        info1 = nutriInfo[356].name;
        info2 = nutriInfo[356].percentage;
        changeText(info1, info2);
        ind = 356;
        break;

        case 'st40-17':
        ind = 0;
        info1 = nutriInfo[357].name;
        info2 = nutriInfo[357].percentage;
        changeText(info1, info2);
        ind = 357;
        break;

        case 'st40-32':
        ind = 0;
        info1 = nutriInfo[358].name;
        info2 = nutriInfo[358].percentage;
        changeText(info1, info2);
        ind = 358;
        break;

        case 'st40-29':
        ind = 0;
        info1 = nutriInfo[359].name;
        info2 = nutriInfo[359].percentage;
        changeText(info1, info2);
        ind = 359;
        break;

        case 'st40-31':
        ind = 0;
        info1 = nutriInfo[360].name;
        info2 = nutriInfo[360].percentage;
        changeText(info1, info2);
        ind = 360;
        break;

        case 'st40-26':
        ind = 0;
        info1 = nutriInfo[361].name;
        info2 = nutriInfo[361].percentage;
        changeText(info1, info2);
        ind = 361;
        break;

        case 'st40-24':
        ind = 0;
        info1 = nutriInfo[362].name;
        info2 = nutriInfo[362].percentage;
        changeText(info1, info2);
        ind = 362;
        break;

        case 'st41-17':
        ind = 0;
        info1 = nutriInfo2[0].name;
        info2 = nutriInfo2[0].percentage;
        changeText(info1, info2);
        ind = 363;
        break;

        case 'st41-32':
        ind = 0;
        info1 = nutriInfo2[1].name;
        info2 = nutriInfo2[1].percentage;
        changeText(info1, info2);
        ind = 364;
        break;

        case 'st41-29':
        ind = 0;
        info1 = nutriInfo2[2].name;
        info2 = nutriInfo2[2].percentage;
        changeText(info1, info2);
        ind = 365;
        break;

        case 'st41-31':
        ind = 0;
        info1 = nutriInfo2[3].name;
        info2 = nutriInfo2[3].percentage;
        changeText(info1, info2);
        ind = 366;
        break;

        case 'st41-26':
        ind = 0;
        info1 = nutriInfo2[4].name;
        info2 = nutriInfo2[4].percentage;
        changeText(info1, info2);
        ind = 367;
        break;

        case 'st41-24':
        ind = 0;
        info1 = nutriInfo2[5].name;
        info2 = nutriInfo2[5].percentage;
        changeText(info1, info2);
        ind = 368;
        break;

        case 'st42-16':
        ind = 0;
        info1 = nutriInfo2[6].name;
        info2 = nutriInfo2[6].percentage;
        changeText(info1, info2);
        ind = 369;
        break;

        case 'st42-17':
        ind = 0;
        info1 = nutriInfo2[7].name;
        info2 = nutriInfo2[7].percentage;
        changeText(info1, info2);
        ind = 370;
        break;

        case 'st42-32':
        ind = 0;
        info1 = nutriInfo2[8].name;
        info2 = nutriInfo2[8].percentage;
        changeText(info1, info2);
        ind = 371;
        break;

        case 'st42-29':
        ind = 0;
        info1 = nutriInfo2[9].name;
        info2 = nutriInfo2[9].percentage;
        changeText(info1, info2);
        ind = 372;
        break;

        case 'st42-31':
        ind = 0;
        info1 = nutriInfo2[10].name;
        info2 = nutriInfo2[10].percentage;
        changeText(info1, info2);
        ind = 373;
        break;

        case 'st42-36':
        ind = 0;
        info1 = nutriInfo2[11].name;
        info2 = nutriInfo2[11].percentage;
        changeText(info1, info2);
        ind = 374;
        break; 

        case 'st42-360':
        ind = 0;
        info1 = nutriInfo2[12].name;
        info2 = nutriInfo2[12].percentage;
        changeText(info1, info2);
        ind = 375;
        break; 

        case 'st42-26':
        ind = 0;
        info1 = nutriInfo2[13].name;
        info2 = nutriInfo2[13].percentage;
        changeText(info1, info2);
        ind = 376;
        break;

        case 'st42-24':
        ind = 0;
        info1 = nutriInfo2[14].name;
        info2 = nutriInfo2[14].percentage;
        changeText(info1, info2);
        ind = 377;
        break;

        case 'st43-17':
        ind = 0;
        info1 = nutriInfo2[15].name;
        info2 = nutriInfo2[15].percentage;
        changeText(info1, info2);
        ind = 378;
        break;

        case 'st43-32':
        ind = 0;
        info1 = nutriInfo2[16].name;
        info2 = nutriInfo2[16].percentage;
        changeText(info1, info2);
        ind = 379;
        break;

        case 'st43-29':
        ind = 0;
        info1 = nutriInfo2[17].name;
        info2 = nutriInfo2[17].percentage;
        changeText(info1, info2);
        ind = 380;
        break;

        case 'st44-28':
        ind = 0;
        info1 = nutriInfo2[18].name;
        info2 = nutriInfo2[18].percentage;
        changeText(info1, info2);
        ind = 381;
        break;

        case 'st44-16':
        ind = 0;
        info1 = nutriInfo2[19].name;
        info2 = nutriInfo2[19].percentage;
        changeText(info1, info2);
        ind = 382;
        break;

        case 'st44-17':
        ind = 0;
        info1 = nutriInfo2[20].name;
        info2 = nutriInfo2[20].percentage;
        changeText(info1, info2);
        ind = 383;
        break;

        case 'st44-29':
        ind = 0;
        info1 = nutriInfo2[21].name;
        info2 = nutriInfo2[21].percentage;
        changeText(info1, info2);
        ind = 384;
        break;

        case 'st44-31':
        ind = 0;
        info1 = nutriInfo2[22].name;
        info2 = nutriInfo2[22].percentage;
        changeText(info1, info2);
        ind = 385;
        break;

        case 'st44-36':
        ind = 0;
        info1 = nutriInfo2[23].name;
        info2 = nutriInfo2[23].percentage;
        changeText(info1, info2);
        ind = 386;
        break;

        case 'st44-26':
        ind = 0;
        info1 = nutriInfo2[24].name;
        info2 = nutriInfo2[24].percentage;
        changeText(info1, info2);
        ind = 387;
        break;

        case 'st44-41':
        ind = 0;
        info1 = nutriInfo2[25].name;
        info2 = nutriInfo2[25].percentage;
        changeText(info1, info2);
        ind = 388;
        break;

        case 'st44-23':
        ind = 0;
        info1 = nutriInfo2[26].name;
        info2 = nutriInfo2[26].percentage;
        changeText(info1, info2);
        ind = 389;
        break;

        case 'st44-24':
        ind = 0;
        info1 = nutriInfo2[27].name;
        info2 = nutriInfo2[27].percentage;
        changeText(info1, info2);
        ind = 390;
        break;

        case 'st44-21':
        ind = 0;
        info1 = nutriInfo2[28].name;
        info2 = nutriInfo2[28].percentage;
        changeText(info1, info2);
        ind = 391;
        break;

        case 'st44-22':
        ind = 0;
        info1 = nutriInfo2[29].name;
        info2 = nutriInfo2[29].percentage;
        changeText(info1, info2);
        ind = 392;
        break;

        case 'st45-18':
        ind = 0;
        info1 = nutriInfo2[30].name;
        info2 = nutriInfo2[30].percentage;
        changeText(info1, info2);
        ind = 393;
        break;

        case 'st45-22':
        ind = 0;
        info1 = nutriInfo2[31].name;
        info2 = nutriInfo2[31].percentage;
        changeText(info1, info2);
        ind = 394;
        break;

        case 'st46-16':
        ind = 0;
        info1 = nutriInfo2[32].name;
        info2 = nutriInfo2[32].percentage;
        changeText(info1, info2);
        ind = 395;
        break;

        case 'st46-20':
        ind = 0;
        info1 = nutriInfo2[33].name;
        info2 = nutriInfo2[33].percentage;
        changeText(info1, info2);
        ind = 396;
        break;

        case 'st46-36':
        ind = 0;
        info1 = nutriInfo2[34].name;
        info2 = nutriInfo2[34].percentage;
        changeText(info1, info2);
        ind = 397;
        break;

        case 'st46-18':
        ind = 0;
        info1 = nutriInfo2[35].name;
        info2 = nutriInfo2[35].percentage;
        changeText(info1, info2);
        ind = 398;
        break;

        case 'st46-19':
        ind = 0;
        info1 = nutriInfo2[36].name;
        info2 = nutriInfo2[36].percentage;
        changeText(info1, info2);
        ind = 399;
        break;

        case 'st46-23':
        ind = 0;
        info1 = nutriInfo2[37].name;
        info2 = nutriInfo2[37].percentage;
        changeText(info1, info2);
        ind = 400;
        break;

        case 'st46-18':
        ind = 0;
        info1 = nutriInfo2[38].name;
        info2 = nutriInfo2[38].percentage;
        changeText(info1, info2);
        ind = 401;
        break;

        case 'st46-21':
        ind = 0;
        info1 = nutriInfo2[39].name;
        info2 = nutriInfo2[39].percentage;
        changeText(info1, info2);
        ind = 402;
        break;

        case 'st46-22':
        ind = 0;
        info1 = nutriInfo2[40].name;
        info2 = nutriInfo2[40].percentage;
        changeText(info1, info2);
        ind = 403;
        break;

        case 'st47-22':
        ind = 0;
        info1 = nutriInfo2[41].name;
        info2 = nutriInfo2[41].percentage;
        changeText(info1, info2);
        ind = 404;
        break;

        case 'st48-20':
        ind = 0;
        info1 = nutriInfo2[42].name;
        info2 = nutriInfo2[42].percentage;
        changeText(info1, info2);
        ind = 405;
        break;

        case 'st48-25':
        ind = 0;
        info1 = nutriInfo2[43].name;
        info2 = nutriInfo2[43].percentage;
        changeText(info1, info2);
        ind = 406;
        break;

        case 'st48-32':
        ind = 0;
        info1 = nutriInfo2[44].name;
        info2 = nutriInfo2[44].percentage;
        changeText(info1, info2);
        ind = 407;
        break;

        case 'st48-38':
        ind = 0;
        info1 = nutriInfo2[45].name;
        info2 = nutriInfo2[45].percentage;
        changeText(info1, info2);
        ind = 408;
        break;

        case 'st48-35':
        ind = 0;
        info1 = nutriInfo2[46].name;
        info2 = nutriInfo2[46].percentage;
        changeText(info1, info2);
        ind = 409;
        break;

        case 'st48-350':
        ind = 0;
        info1 = nutriInfo2[47].name;
        info2 = nutriInfo2[47].percentage;
        changeText(info1, info2);
        ind = 410;
        break;

        case 'st48-26':
        ind = 0;
        info1 = nutriInfo2[48].name;
        info2 = nutriInfo2[48].percentage;
        changeText(info1, info2);
        ind = 411;
        break;

        case 'st48-39':
        ind = 0;
        info1 = nutriInfo2[49].name;
        info2 = nutriInfo2[49].percentage;
        changeText(info1, info2);
        ind = 412;
        break;

        case 'st48-41':
        ind = 0;
        info1 = nutriInfo2[50].name;
        info2 = nutriInfo2[50].percentage;
        changeText(info1, info2);
        ind = 413;
        break;

        case 'st48-34':
        ind = 0;
        info1 = nutriInfo2[51].name;
        info2 = nutriInfo2[51].percentage;
        changeText(info1, info2);
        ind = 414;
        break;

        case 'st48-18':
        ind = 0;
        info1 = nutriInfo2[52].name;
        info2 = nutriInfo2[52].percentage;
        changeText(info1, info2);
        ind = 415;
        break;

        case 'st48-19':
        ind = 0;
        info1 = nutriInfo2[53].name;
        info2 = nutriInfo2[53].percentage;
        changeText(info1, info2);
        ind = 416;
        break;

        case 'st48-23':
        ind = 0;
        info1 = nutriInfo2[54].name;
        info2 = nutriInfo2[54].percentage;
        changeText(info1, info2);
        ind = 417;
        break;

        case 'st48-24':
        ind = 0;
        info1 = nutriInfo2[55].name;
        info2 = nutriInfo2[55].percentage;
        changeText(info1, info2);
        ind = 418;
        break;

        case 'st48-240':
        ind = 0;
        info1 = nutriInfo2[56].name;
        info2 = nutriInfo2[56].percentage;
        changeText(info1, info2);
        ind = 419;
        break;

        case 'st48-180':
        ind = 0;
        info1 = nutriInfo2[57].name;
        info2 = nutriInfo2[57].percentage;
        changeText(info1, info2);
        ind = 420;
        break;

        case 'st48-21':
        ind = 0;
        info1 = nutriInfo2[58].name;
        info2 = nutriInfo2[58].percentage;
        changeText(info1, info2);
        ind = 421;
        break;

        case 'st48-42':
        ind = 0;
        info1 = nutriInfo2[59].name;
        info2 = nutriInfo2[59].percentage;
        changeText(info1, info2);
        ind = 422;
        break;

        case 'st48-14':
        ind = 0;
        info1 = nutriInfo2[60].name;
        info2 = nutriInfo2[60].percentage;
        changeText(info1, info2);
        ind = 423;
        break;

        case 'st48-28':
        ind = 0;
        info1 = nutriInfo2[61].name;
        info2 = nutriInfo2[61].percentage;
        changeText(info1, info2);
        ind = 424;
        break;

        case 'st48-16':
        ind = 0;
        info1 = nutriInfo2[62].name;
        info2 = nutriInfo2[62].percentage;
        changeText(info1, info2);
        ind = 425;
        break;

        case 'st48-25':
        ind = 0;
        info1 = nutriInfo2[63].name;
        info2 = nutriInfo2[63].percentage;
        changeText(info1, info2);
        ind = 426;
        break;

        case 'st48-30':
        ind = 0;
        info1 = nutriInfo2[64].name;
        info2 = nutriInfo2[64].percentage;
        changeText(info1, info2);
        ind = 427;
        break;

        case 'st48-33':
        ind = 0;
        info1 = nutriInfo2[65].name;
        info2 = nutriInfo2[65].percentage;
        changeText(info1, info2);
        ind = 428;
        break;

        case 'st48-26':
        ind = 0;
        info1 = nutriInfo2[66].name;
        info2 = nutriInfo2[66].percentage;
        changeText(info1, info2);
        ind = 429;
        break;

        case 'st48-18':
        ind = 0;
        info1 = nutriInfo2[67].name;
        info2 = nutriInfo2[67].percentage;
        changeText(info1, info2);
        ind = 430;
        break;

        case 'st48-23':
        ind = 0;
        info1 = nutriInfo2[68].name;
        info2 = nutriInfo2[68].percentage;
        changeText(info1, info2);
        ind = 431;
        break;

        case 'st48-180':
        ind = 0;
        info1 = nutriInfo2[69].name;
        info2 = nutriInfo2[69].percentage;
        changeText(info1, info2);
        ind = 432;
        break;

        case 'st48-21':
        ind = 0;
        info1 = nutriInfo2[70].name;
        info2 = nutriInfo2[70].percentage;
        changeText(info1, info2);
        ind = 433;
        break;

        case 'st48-42':
        ind = 0;
        info1 = nutriInfo2[71].name;
        info2 = nutriInfo2[71].percentage;
        changeText(info1, info2);
        ind = 434;
        break;

        case 'st49-14':
        ind = 0;
        info1 = nutriInfo3[0].name;
        info2 = nutriInfo3[0].percentage;
        changeText(info1, info2);
        ind = 435;
        break;

        case 'st49-28':
        ind = 0;
        info1 = nutriInfo3[1].name;
        info2 = nutriInfo3[1].percentage;
        changeText(info1, info2);
        ind = 436;
        break;

        case 'st49-16':
        ind = 0;
        info1 = nutriInfo3[2].name;
        info2 = nutriInfo3[2].percentage;
        changeText(info1, info2);
        ind = 437;
        break;

        case 'st49-25':
        ind = 0;
        info1 = nutriInfo3[3].name;
        info2 = nutriInfo3[3].percentage;
        changeText(info1, info2);
        ind = 438;
        break;

        case 'st49-30':
        ind = 0;
        info1 = nutriInfo3[4].name;
        info2 = nutriInfo3[4].percentage;
        changeText(info1, info2);
        ind = 439;
        break;

        case 'st49-33':
        ind = 0;
        info1 = nutriInfo3[5].name;
        info2 = nutriInfo3[5].percentage;
        changeText(info1, info2);
        ind = 440;
        break;

        case 'st49-26':
        ind = 0;
        info1 = nutriInfo3[6].name;
        info2 = nutriInfo3[6].percentage;
        changeText(info1, info2);
        ind = 441;
        break;

        case 'st49-180':
        ind = 0;
        info1 = nutriInfo3[7].name;
        info2 = nutriInfo3[7].percentage;
        changeText(info1, info2);
        ind = 442;
        break;

        case 'st49-23':
        ind = 0;
        info1 = nutriInfo3[8].name;
        info2 = nutriInfo3[8].percentage;
        changeText(info1, info2);
        ind = 443;
        break;

        case 'st49-18':
        ind = 0;
        info1 = nutriInfo3[9].name;
        info2 = nutriInfo3[9].percentage;
        changeText(info1, info2);
        ind = 444;
        break;

        case 'st49-21':
        ind = 0;
        info1 = nutriInfo3[10].name;
        info2 = nutriInfo3[10].percentage;
        changeText(info1, info2);
        ind = 445;
        break;

        case 'st49-22':
        ind = 0;
        info1 = nutriInfo3[11].name;
        info2 = nutriInfo3[11].percentage;
        changeText(info1, info2);
        ind = 446;
        break;

        case 'st49-42':
        ind = 0;
        info1 = nutriInfo3[12].name;
        info2 = nutriInfo3[12].percentage;
        changeText(info1, info2);
        ind = 447;
        break;

        case 'st50-29':
        ind = 0;
        info1 = nutriInfo3[13].name;
        info2 = nutriInfo3[13].percentage;
        changeText(info1, info2);
        ind = 448;
        break;

        case 'st50-26':
        ind = 0;
        info1 = nutriInfo3[14].name;
        info2 = nutriInfo3[14].percentage;
        changeText(info1, info2);
        ind = 449;
        break;

        case 'st51-14':
        ind = 0;
        info1 = nutriInfo3[15].name;
        info2 = nutriInfo3[15].percentage;
        changeText(info1, info2);
        ind = 450;
        break;

        case 'st51-20':
        ind = 0;
        info1 = nutriInfo3[16].name;
        info2 = nutriInfo3[16].percentage;
        changeText(info1, info2);
        ind = 451;
        break;

        case 'st51-25':
        ind = 0;
        info1 = nutriInfo3[17].name;
        info2 = nutriInfo3[17].percentage;
        changeText(info1, info2);
        ind = 452;
        break;

        case 'st51-33':
        ind = 0;
        info1 = nutriInfo3[18].name;
        info2 = nutriInfo3[18].percentage;
        changeText(info1, info2);
        ind = 453;
        break;

        case 'st51-26':
        ind = 0;
        info1 = nutriInfo3[19].name;
        info2 = nutriInfo3[19].percentage;
        changeText(info1, info2);
        ind = 454;
        break;

        case 'st51-39':
        ind = 0;
        info1 = nutriInfo3[20].name;
        info2 = nutriInfo3[20].percentage;
        changeText(info1, info2);
        ind = 455;
        break;

        case 'st51-41':
        ind = 0;
        info1 = nutriInfo3[21].name;
        info2 = nutriInfo3[21].percentage;
        changeText(info1, info2);
        ind = 456;
        break;

        case 'st51-19':
        ind = 0;
        info1 = nutriInfo3[22].name;
        info2 = nutriInfo3[22].percentage;
        changeText(info1, info2);
        ind = 457;
        break;

        case 'st51-23':
        ind = 0;
        info1 = nutriInfo3[23].name;
        info2 = nutriInfo3[23].percentage;
        changeText(info1, info2);
        ind = 458;
        break;

        case 'st51-24':
        ind = 0;
        info1 = nutriInfo3[24].name;
        info2 = nutriInfo3[24].percentage;
        changeText(info1, info2);
        ind = 459;
        break;

        case 'st51-18':
        ind = 0;
        info1 = nutriInfo3[25].name;
        info2 = nutriInfo3[25].percentage;
        changeText(info1, info2);
        ind = 460;
        break;

        case 'st51-42':
        ind = 0;
        info1 = nutriInfo3[26].name;
        info2 = nutriInfo3[26].percentage;
        changeText(info1, info2);
        ind = 461;
        break;

        case 'st52-14':
        ind = 0;
        info1 = nutriInfo3[27].name;
        info2 = nutriInfo3[27].percentage;
        changeText(info1, info2);
        ind = 462;
        break;

        case 'st52-25':
        ind = 0;
        info1 = nutriInfo3[28].name;
        info2 = nutriInfo3[28].percentage;
        changeText(info1, info2);
        ind = 463;
        break;

        case 'st52-38':
        ind = 0;
        info1 = nutriInfo3[29].name;
        info2 = nutriInfo3[29].percentage;
        changeText(info1, info2);
        ind = 464;
        break;

        case 'st52-35':
        ind = 0;
        info1 = nutriInfo3[30].name;
        info2 = nutriInfo3[30].percentage;
        changeText(info1, info2);
        ind = 465;
        break;

        case 'st52-33':
        ind = 0;
        info1 = nutriInfo3[31].name;
        info2 = nutriInfo3[31].percentage;
        changeText(info1, info2);
        ind = 466;
        break;

        case 'st52-39':
        ind = 0;
        info1 = nutriInfo3[32].name;
        info2 = nutriInfo3[32].percentage;
        changeText(info1, info2);
        ind = 467;
        break;

        case 'st52-18':
        ind = 0;
        info1 = nutriInfo3[33].name;
        info2 = nutriInfo3[33].percentage;
        changeText(info1, info2);
        ind = 468;
        break;

        case 'st52-19':
        ind = 0;
        info1 = nutriInfo3[34].name;
        info2 = nutriInfo3[34].percentage;
        changeText(info1, info2);
        ind = 469;
        break;

        case 'st52-23':
        ind = 0;
        info1 = nutriInfo3[35].name;
        info2 = nutriInfo3[35].percentage;
        changeText(info1, info2);
        ind = 470;
        break;

        case 'st52-24':
        ind = 0;
        info1 = nutriInfo3[36].name;
        info2 = nutriInfo3[36].percentage;
        changeText(info1, info2);
        ind = 471;
        break;

        case 'st52-18':
        ind = 0;
        info1 = nutriInfo3[37].name;
        info2 = nutriInfo3[37].percentage;
        changeText(info1, info2);
        ind = 472;
        break;

        case 'st52-21':
        ind = 0;
        info1 = nutriInfo3[38].name;
        info2 = nutriInfo3[38].percentage;
        changeText(info1, info2);
        ind = 473;
        break;

        case 'st52-42':
        ind = 0;
        info1 = nutriInfo3[39].name;
        info2 = nutriInfo3[39].percentage;
        changeText(info1, info2);
        ind = 474;
        break;

        case 'st53-14':
        ind = 0;
        info1 = nutriInfo3[40].name;
        info2 = nutriInfo3[40].percentage;
        changeText(info1, info2);
        ind = 475;
        break;

        case 'st53-16':
        ind = 0;
        info1 = nutriInfo3[41].name;
        info2 = nutriInfo3[41].percentage;
        changeText(info1, info2);
        ind = 476;
        break;

        case 'st53-20':
        ind = 0;
        info1 = nutriInfo3[42].name;
        info2 = nutriInfo3[42].percentage;
        changeText(info1, info2);
        ind = 477;
        break;

        case 'st53-25':
        ind = 0;
        info1 = nutriInfo3[43].name;
        info2 = nutriInfo3[43].percentage;
        changeText(info1, info2);
        ind = 478;
        break;

        case 'st53-32':
        ind = 0;
        info1 = nutriInfo3[44].name;
        info2 = nutriInfo3[44].percentage;
        changeText(info1, info2);
        ind = 479;
        break;

        case 'st53-29':
        ind = 0;
        info1 = nutriInfo3[45].name;
        info2 = nutriInfo3[45].percentage;
        changeText(info1, info2);
        ind = 480;
        break;

        case 'st53-17':
        ind = 0;
        info1 = nutriInfo3[46].name;
        info2 = nutriInfo3[46].percentage;
        changeText(info1, info2);
        ind = 481;
        break;

        case 'st53-30':
        ind = 0;
        info1 = nutriInfo3[47].name;
        info2 = nutriInfo3[47].percentage;
        changeText(info1, info2);
        ind = 482;
        break;

        case 'st53-33':
        ind = 0;
        info1 = nutriInfo3[48].name;
        info2 = nutriInfo3[48].percentage;
        changeText(info1, info2);
        ind = 483;
        break;

        case 'st53-26':
        ind = 0;
        info1 = nutriInfo3[49].name;
        info2 = nutriInfo3[49].percentage;
        changeText(info1, info2);
        ind = 484;
        break;

        case 'st53-34':
        ind = 0;
        info1 = nutriInfo3[50].name;
        info2 = nutriInfo3[50].percentage;
        changeText(info1, info2);
        ind = 485;
        break;

        case 'st53-180':
        ind = 0;
        info1 = nutriInfo3[51].name;
        info2 = nutriInfo3[51].percentage;
        changeText(info1, info2);
        ind = 486;
        break;

        case 'st53-19':
        ind = 0;
        info1 = nutriInfo3[52].name;
        info2 = nutriInfo3[52].percentage;
        changeText(info1, info2);
        ind = 487;
        break;

        case 'st53-23':
        ind = 0;
        info1 = nutriInfo3[53].name;
        info2 = nutriInfo3[53].percentage;
        changeText(info1, info2);
        ind = 488;
        break;

        case 'st53-24':
        ind = 0;
        info1 = nutriInfo3[54].name;
        info2 = nutriInfo3[54].percentage;
        changeText(info1, info2);
        ind = 489;
        break;

        case 'st53-18':
        ind = 0;
        info1 = nutriInfo3[55].name;
        info2 = nutriInfo3[55].percentage;
        changeText(info1, info2);
        ind = 490;
        break;

        case 'st53-21':
        ind = 0;
        info1 = nutriInfo3[56].name;
        info2 = nutriInfo3[56].percentage;
        changeText(info1, info2);
        ind = 491;
        break;

        case 'st53-22':
        ind = 0;
        info1 = nutriInfo3[57].name;
        info2 = nutriInfo3[57].percentage;
        changeText(info1, info2);
        ind = 492;
        break;

        case 'st54-25':
        ind = 0;
        info1 = nutriInfo3[58].name;
        info2 = nutriInfo3[58].percentage;
        changeText(info1, info2);
        ind = 493;
        break;

        case 'st54-23':
        ind = 0;
        info1 = nutriInfo3[59].name;
        info2 = nutriInfo3[59].percentage;
        changeText(info1, info2);
        ind = 494;
        break;

        case 'st55-14':
        ind = 0;
        info1 = nutriInfo3[60].name;
        info2 = nutriInfo3[60].percentage;
        changeText(info1, info2);
        ind = 495;
        break;

        case 'st55-25':
        ind = 0;
        info1 = nutriInfo3[61].name;
        info2 = nutriInfo3[61].percentage;
        changeText(info1, info2);
        ind = 496;
        break;

        case 'st55-30':
        ind = 0;
        info1 = nutriInfo3[62].name;
        info2 = nutriInfo3[62].percentage;
        changeText(info1, info2);
        ind = 497;
        break;

        case 'st55-33':
        ind = 0;
        info1 = nutriInfo3[63].name;
        info2 = nutriInfo3[63].percentage;
        changeText(info1, info2);
        ind = 498;
        break;

        case 'st55-26':
        ind = 0;
        info1 = nutriInfo3[64].name;
        info2 = nutriInfo3[64].percentage;
        changeText(info1, info2);
        ind = 499;
        break;

        case 'st55-39':
        ind = 0;
        info1 = nutriInfo3[65].name;
        info2 = nutriInfo3[65].percentage;
        changeText(info1, info2);
        ind = 500;
        break;

        case 'st55-41':
        ind = 0;
        info1 = nutriInfo3[66].name;
        info2 = nutriInfo3[66].percentage;
        changeText(info1, info2);
        ind = 501;
        break;

        case 'st55-18':
        ind = 0;
        info1 = nutriInfo3[67].name;
        info2 = nutriInfo3[67].percentage;
        changeText(info1, info2);
        ind = 502;
        break;

        case 'st55-19':
        ind = 0;
        info1 = nutriInfo3[68].name;
        info2 = nutriInfo3[68].percentage;
        changeText(info1, info2);
        ind = 503;
        break;

        case 'st55-23':
        ind = 0;
        info1 = nutriInfo3[69].name;
        info2 = nutriInfo3[69].percentage;
        changeText(info1, info2);
        ind = 504;
        break;

        case 'st55-24':
        ind = 0;
        info1 = nutriInfo3[70].name;
        info2 = nutriInfo3[70].percentage;
        changeText(info1, info2);
        ind = 505;
        break;

        case 'st55-180':
        ind = 0;
        info1 = nutriInfo3[71].name;
        info2 = nutriInfo3[71].percentage;
        changeText(info1, info2);
        ind = 506;
        break;

        case 'st55-42':
        ind = 0;
        info1 = nutriInfo3[72].name;
        info2 = nutriInfo3[72].percentage;
        changeText(info1, info2);
        ind = 507;
        break;

        case 'st56-25':
        ind = 0;
        info1 = nutriInfo3[73].name;
        info2 = nutriInfo3[73].percentage;
        changeText(info1, info2);
        ind = 508;
        break;

        case 'st56-33':
        ind = 0;
        info1 = nutriInfo3[74].name;
        info2 = nutriInfo3[74].percentage;
        changeText(info1, info2);
        ind = 509;
        break;

        case 'st56-26':
        ind = 0;
        info1 = nutriInfo3[75].name;
        info2 = nutriInfo3[75].percentage;
        changeText(info1, info2);
        ind = 510;
        break;

        case 'st56-39':
        ind = 0;
        info1 = nutriInfo3[76].name;
        info2 = nutriInfo3[76].percentage;
        changeText(info1, info2);
        ind = 511;
        break;

        case 'st56-19':
        ind = 0;
        info1 = nutriInfo3[77].name;
        info2 = nutriInfo3[77].percentage;
        changeText(info1, info2);
        ind = 512;
        break;

        case 'st56-23':
        ind = 0;
        info1 = nutriInfo3[78].name;
        info2 = nutriInfo3[78].percentage;
        changeText(info1, info2);
        ind = 513;
        break;

        case 'st56-24':
        ind = 0;
        info1 = nutriInfo3[79].name;
        info2 = nutriInfo3[79].percentage;
        changeText(info1, info2);
        ind = 514;
        break;

        case 'st56-42':
        ind = 0;
        info1 = nutriInfo3[80].name;
        info2 = nutriInfo3[80].percentage;
        changeText(info1, info2);
        ind = 515;
        break;

        case 'st58-14':
        ind = 0;
        info1 = nutriInfo3[81].name;
        info2 = nutriInfo3[81].percentage;
        changeText(info1, info2);
        ind = 516;
        break;

        case 'st58-28':
        ind = 0;
        info1 = nutriInfo3[82].name;
        info2 = nutriInfo3[82].percentage;
        changeText(info1, info2);
        ind = 517;
        break;

        case 'st58-16':
        ind = 0;
        info1 = nutriInfo3[83].name;
        info2 = nutriInfo3[83].percentage;
        changeText(info1, info2);
        ind = 518;
        break;

        case 'st58-25':
        ind = 0;
        info1 = nutriInfo3[84].name;
        info2 = nutriInfo3[84].percentage;
        changeText(info1, info2);
        ind = 519;
        break;

        case 'st58-35':
        ind = 0;
        info1 = nutriInfo3[85].name;
        info2 = nutriInfo3[85].percentage;
        changeText(info1, info2);
        ind = 520;
        break;

        case 'st58-36':
        ind = 0;
        info1 = nutriInfo3[86].name;
        info2 = nutriInfo3[86].percentage;
        changeText(info1, info2);
        ind = 521;
        break;

        case 'st58-30':
        ind = 0;
        info1 = nutriInfo3[87].name;
        info2 = nutriInfo3[87].percentage;
        changeText(info1, info2);
        ind = 522;
        break;

        case 'st58-26':
        ind = 0;
        info1 = nutriInfo3[88].name;
        info2 = nutriInfo3[88].percentage;
        changeText(info1, info2);
        ind = 523;
        break;

        case 'st58-34':
        ind = 0;
        info1 = nutriInfo3[89].name;
        info2 = nutriInfo3[89].percentage;
        changeText(info1, info2);
        ind = 524;
        break;

        case 'st58-18':
        ind = 0;
        info1 = nutriInfo3[90].name;
        info2 = nutriInfo3[90].percentage;
        changeText(info1, info2);
        ind = 525;
        break;

        case 'st58-19':
        ind = 0;
        info1 = nutriInfo3[91].name;
        info2 = nutriInfo3[91].percentage;
        changeText(info1, info2);
        ind = 526;
        break;

        case 'st58-23':
        ind = 0;
        info1 = nutriInfo3[92].name;
        info2 = nutriInfo3[92].percentage;
        changeText(info1, info2);
        ind = 527;
        break;

        case 'st58-24':
        ind = 0;
        info1 = nutriInfo3[93].name;
        info2 = nutriInfo3[93].percentage;
        changeText(info1, info2);
        ind = 528;
        break;

        case 'st58-180':
        ind = 0;
        info1 = nutriInfo3[94].name;
        info2 = nutriInfo3[94].percentage;
        changeText(info1, info2);
        ind = 529;
        break;

        case 'st58-21':
        ind = 0;
        info1 = nutriInfo3[95].name;
        info2 = nutriInfo3[95].percentage;
        changeText(info1, info2);
        ind = 530;
        break;

        case 'st58-22':
        ind = 0;
        info1 = nutriInfo3[96].name;
        info2 = nutriInfo3[96].percentage;
        changeText(info1, info2);
        ind = 531;
        break;

        case 'st59-25':
        ind = 0;
        info1 = nutriInfo3[97].name;
        info2 = nutriInfo3[97].percentage;
        changeText(info1, info2);
        ind = 532;
        break;

        case 'st59-33':
        ind = 0;
        info1 = nutriInfo3[98].name;
        info2 = nutriInfo3[98].percentage;
        changeText(info1, info2);
        ind = 533;
        break;

        case 'st59-26':
        ind = 0;
        info1 = nutriInfo3[99].name;
        info2 = nutriInfo3[99].percentage;
        changeText(info1, info2);
        ind = 534;
        break;

        case 'st59-39':
        ind = 0;
        info1 = nutriInfo3[100].name;
        info2 = nutriInfo3[100].percentage;
        changeText(info1, info2);
        ind = 535;
        break;

        case 'st59-19':
        ind = 0;
        info1 = nutriInfo3[101].name;
        info2 = nutriInfo3[101].percentage;
        changeText(info1, info2);
        ind = 536;
        break;

        case 'st59-24':
        ind = 0;
        info1 = nutriInfo3[102].name;
        info2 = nutriInfo3[102].percentage;
        changeText(info1, info2);
        ind = 537;
        break;

        case 'st59-240':
        ind = 0;
        info1 = nutriInfo3[103].name;
        info2 = nutriInfo3[103].percentage;
        changeText(info1, info2);
        ind = 538;
        break;
        
        case 'st59-18':
        ind = 0;
        info1 = nutriInfo3[104].name;
        info2 = nutriInfo3[104].percentage;
        changeText(info1, info2);
        ind = 539;
        break;

        case 'st59-42':
        ind = 0;
        info1 = nutriInfo3[105].name;
        info2 = nutriInfo3[105].percentage;
        changeText(info1, info2);
        ind = 540;
        break;

        case 'st60-14':
        ind = 0;
        info1 = nutriInfo3[106].name;
        info2 = nutriInfo3[106].percentage;
        changeText(info1, info2);
        ind = 541;
        break;

        case 'st60-20':
        ind = 0;
        info1 = nutriInfo3[107].name;
        info2 = nutriInfo3[107].percentage;
        changeText(info1, info2);
        ind = 542;
        break;

        case 'st60-25':
        ind = 0;
        info1 = nutriInfo3[108].name;
        info2 = nutriInfo3[108].percentage;
        changeText(info1, info2);
        ind = 543;
        break;

        case 'st60-39':
        ind = 0;
        info1 = nutriInfo3[109].name;
        info2 = nutriInfo3[109].percentage;
        changeText(info1, info2);
        ind = 544;
        break;

        case 'st60-18':
        ind = 0;
        info1 = nutriInfo3[110].name;
        info2 = nutriInfo3[110].percentage;
        changeText(info1, info2);
        ind = 545;
        break;

        case 'st60-23':
        ind = 0;
        info1 = nutriInfo3[111].name;
        info2 = nutriInfo3[111].percentage;
        changeText(info1, info2);
        ind = 546;
        break;

        case 'st60-24':
        ind = 0;
        info1 = nutriInfo3[112].name;
        info2 = nutriInfo3[112].percentage;
        changeText(info1, info2);
        ind = 547;
        break;

        case 'st60-43':
        ind = 0;
        info1 = nutriInfo3[113].name;
        info2 = nutriInfo3[113].percentage;
        changeText(info1, info2);
        ind = 548;
        break;

        case 'st60-180':
        ind = 0;
        info1 = nutriInfo3[114].name;
        info2 = nutriInfo3[114].percentage;
        changeText(info1, info2);
        ind = 549;
        break;

        case 'st61-16':
        ind = 0;
        info1 = nutriInfo3[115].name;
        info2 = nutriInfo3[115].percentage;
        changeText(info1, info2);
        ind = 550;
        break;

        case 'st61-26':
        ind = 0;
        info1 = nutriInfo3[116].name;
        info2 = nutriInfo3[116].percentage;
        changeText(info1, info2);
        ind = 551;
        break;

        case 'st61-22':
        ind = 0;
        info1 = nutriInfo2[31].name;
        info2 = nutriInfo2[31].percentage;
        changeText(info1, info2);
        ind = 551;
        break;

        case 'st62-14':
        ind = 0;
        info1 = nutriInfo3[117].name;
        info2 = nutriInfo3[117].percentage;
        changeText(info1, info2);
        ind = 552;
        break;

        case 'st62-20':
        ind = 0;
        info1 = nutriInfo3[118].name;
        info2 = nutriInfo3[118].percentage;
        changeText(info1, info2);
        ind = 553;
        break;

        case 'st62-25':
        ind = 0;
        info1 = nutriInfo3[119].name;
        info2 = nutriInfo3[119].percentage;
        changeText(info1, info2);
        ind = 554;
        break;

        case 'st62-36':
        ind = 0;
        info1 = nutriInfo3[120].name;
        info2 = nutriInfo3[120].percentage;
        changeText(info1, info2);
        ind = 555;
        break;

        case 'st62-30':
        ind = 0;
        info1 = nutriInfo3[121].name;
        info2 = nutriInfo3[121].percentage;
        changeText(info1, info2);
        ind = 556;
        break;

        case 'st62-26':
        ind = 0;
        info1 = nutriInfo3[122].name;
        info2 = nutriInfo3[122].percentage;
        changeText(info1, info2);
        ind = 557;
        break;

        case 'st62-39':
        ind = 0;
        info1 = nutriInfo3[123].name;
        info2 = nutriInfo3[123].percentage;
        changeText(info1, info2);
        ind = 558;
        break;

        case 'st62-41':
        ind = 0;
        info1 = nutriInfo3[124].name;
        info2 = nutriInfo3[124].percentage;
        changeText(info1, info2);
        ind = 559;
        break;

        case 'st62-18':
        ind = 0;
        info1 = nutriInfo3[125].name;
        info2 = nutriInfo3[125].percentage;
        changeText(info1, info2);
        ind = 560;
        break;

        case 'st62-23':
        ind = 0;
        info1 = nutriInfo3[126].name;
        info2 = nutriInfo3[126].percentage;
        changeText(info1, info2);
        ind = 561;
        break;

        case 'st62-24':
        ind = 0;
        info1 = nutriInfo3[127].name;
        info2 = nutriInfo3[127].percentage;
        changeText(info1, info2);
        ind = 562;
        break;

        case 'st62-180':
        ind = 0;
        info1 = nutriInfo3[128].name;
        info2 = nutriInfo3[128].percentage;
        changeText(info1, info2);
        ind = 563;
        break;

        case 'st62-21':
        ind = 0;
        info1 = nutriInfo3[129].name;
        info2 = nutriInfo3[129].percentage;
        changeText(info1, info2);
        ind = 564;
        break;

        case 'st62-42':
        ind = 0;
        info1 = nutriInfo3[130].name;
        info2 = nutriInfo3[130].percentage;
        changeText(info1, info2);
        ind = 565;
        break;

        case 'st63-14':
        ind = 0;
        info1 = nutriInfo3[131].name;
        info2 = nutriInfo3[131].percentage;
        changeText(info1, info2);
        ind = 566;
        break;

        case 'st63-16':
        ind = 0;
        info1 = nutriInfo3[132].name;
        info2 = nutriInfo3[132].percentage;
        changeText(info1, info2);
        ind = 567;
        break;

        case 'st63-20':
        ind = 0;
        info1 = nutriInfo3[133].name;
        info2 = nutriInfo3[133].percentage;
        changeText(info1, info2);
        ind = 568;
        break;

        case 'st63-25':
        ind = 0;
        info1 = nutriInfo3[134].name;
        info2 = nutriInfo3[134].percentage;
        changeText(info1, info2);
        ind = 569;
        break;

        case 'st63-35':
        ind = 0;
        info1 = nutriInfo3[135].name;
        info2 = nutriInfo3[135].percentage;
        changeText(info1, info2);
        ind = 570;
        break;

        case 'st63-17':
        ind = 0;
        info1 = nutriInfo3[136].name;
        info2 = nutriInfo3[136].percentage;
        changeText(info1, info2);
        ind = 571;
        break;

        case 'st63-30':
        ind = 0;
        info1 = nutriInfo3[137].name;
        info2 = nutriInfo3[137].percentage;
        changeText(info1, info2);
        ind = 572;
        break;

        case 'st63-33':
        ind = 0;
        info1 = nutriInfo3[138].name;
        info2 = nutriInfo3[138].percentage;
        changeText(info1, info2);
        ind = 573;
        break;

        case 'st63-26':
        ind = 0;
        info1 = nutriInfo3[139].name;
        info2 = nutriInfo3[139].percentage;
        changeText(info1, info2);
        ind = 574;
        break;

        case 'st63-18':
        ind = 0;
        info1 = nutriInfo3[140].name;
        info2 = nutriInfo3[140].percentage;
        changeText(info1, info2);
        ind = 575;
        break;

        case 'st63-19':
        ind = 0;
        info1 = nutriInfo3[141].name;
        info2 = nutriInfo3[141].percentage;
        changeText(info1, info2);
        ind = 576;
        break;

        case 'st63-23':
        ind = 0;
        info1 = nutriInfo3[142].name;
        info2 = nutriInfo3[142].percentage;
        changeText(info1, info2);
        ind = 577;
        break;

        case 'st63-24':
        ind = 0;
        info1 = nutriInfo3[143].name;
        info2 = nutriInfo3[143].percentage;
        changeText(info1, info2);
        ind = 578;
        break;

        case 'st63-180':
        ind = 0;
        info1 = nutriInfo3[144].name;
        info2 = nutriInfo3[144].percentage;
        changeText(info1, info2);
        ind = 579;
        break;


        case 'st63-21':
        ind = 0;
        info1 = nutriInfo3[145].name;
        info2 = nutriInfo3[145].percentage;
        changeText(info1, info2);
        ind = 580;
        break;

        case 'st63-22':
        ind = 0;
        info1 = nutriInfo3[146].name;
        info2 = nutriInfo3[146].percentage;
        changeText(info1, info2);
        ind = 581;
        break;

        case 'st63-42':
        ind = 0;
        info1 = nutriInfo3[147].name;
        info2 = nutriInfo3[147].percentage;
        changeText(info1, info2);
        ind = 582;
        break;

        case 'st64-16':
        ind = 0;
        info1 = nutriInfo3[148].name;
        info2 = nutriInfo3[148].percentage;
        changeText(info1, info2);
        ind = 583;
        break;

        case 'st64-17':
        ind = 0;
        info1 = nutriInfo3[149].name;
        info2 = nutriInfo3[149].percentage;
        changeText(info1, info2);
        ind = 584;
        break;

        case 'st64-32':
        ind = 0;
        info1 = nutriInfo3[150].name;
        info2 = nutriInfo3[150].percentage;
        changeText(info1, info2);
        ind = 585;
        break;

        case 'st64-29':
        ind = 0;
        info1 = nutriInfo3[151].name;
        info2 = nutriInfo3[151].percentage;
        changeText(info1, info2);
        ind = 586;
        break;

        case 'st64-35':
        ind = 0;
        info1 = nutriInfo3[152].name;
        info2 = nutriInfo3[152].percentage;
        changeText(info1, info2);
        ind = 587;
        break;

        case 'st64-31':
        ind = 0;
        info1 = nutriInfo3[153].name;
        info2 = nutriInfo3[153].percentage;
        changeText(info1, info2);
        ind = 588;
        break;

        case 'st64-36':
        ind = 0;
        info1 = nutriInfo3[154].name;
        info2 = nutriInfo3[154].percentage;
        changeText(info1, info2);
        ind = 589;
        break;

        case 'st64-30':
        ind = 0;
        info1 = nutriInfo3[155].name;
        info2 = nutriInfo3[155].percentage;
        changeText(info1, info2);
        ind = 590;
        break;

        case 'st64-33':
        ind = 0;
        info1 = nutriInfo3[156].name;
        info2 = nutriInfo3[156].percentage;
        changeText(info1, info2);
        ind = 591;
        break;

        case 'st64-26':
        ind = 0;
        info1 = nutriInfo3[157].name;
        info2 = nutriInfo3[157].percentage;
        changeText(info1, info2);
        ind = 592;
        break;

        case 'st64-41':
        ind = 0;
        info1 = nutriInfo3[158].name;
        info2 = nutriInfo3[158].percentage;
        changeText(info1, info2);
        ind = 593;
        break;

        case 'st64-24':
        ind = 0;
        info1 = nutriInfo3[159].name;
        info2 = nutriInfo3[159].percentage;
        changeText(info1, info2);
        ind = 594;
        break;

        case 'st65-14':
        ind = 0;
        info1 = nutriInfo3[160].name;
        info2 = nutriInfo3[160].percentage;
        changeText(info1, info2);
        ind = 595;
        break;

        case 'st65-16':
        ind = 0;
        info1 = nutriInfo3[161].name;
        info2 = nutriInfo3[161].percentage;
        changeText(info1, info2);
        ind = 596;
        break;

        case 'st65-17':
        ind = 0;
        info1 = nutriInfo3[162].name;
        info2 = nutriInfo3[162].percentage;
        changeText(info1, info2);
        ind = 597;
        break;

        case 'st65-20':
        ind = 0;
        info1 = nutriInfo3[163].name;
        info2 = nutriInfo3[163].percentage;
        changeText(info1, info2);
        ind = 598;
        break;

        case 'st65-25':
        ind = 0;
        info1 = nutriInfo3[164].name;
        info2 = nutriInfo3[164].percentage;
        changeText(info1, info2);
        ind = 599;
        break;

        case 'st65-35':
        ind = 0;
        info1 = nutriInfo3[165].name;
        info2 = nutriInfo3[165].percentage;
        changeText(info1, info2);
        ind = 600;
        break;

        case 'st65-36':
        ind = 0;
        info1 = nutriInfo3[166].name;
        info2 = nutriInfo3[166].percentage;
        changeText(info1, info2);
        ind = 601;
        break;

        case 'st65-26':
        ind = 0;
        info1 = nutriInfo3[167].name;
        info2 = nutriInfo3[167].percentage;
        changeText(info1, info2);
        ind = 602;
        break;

        case 'st65-18':
        ind = 0;
        info1 = nutriInfo3[168].name;
        info2 = nutriInfo3[168].percentage;
        changeText(info1, info2);
        ind = 603;
        break;

        case 'st65-19':
        ind = 0;
        info1 = nutriInfo3[169].name;
        info2 = nutriInfo3[169].percentage;
        changeText(info1, info2);
        ind = 604;
        break;

        case 'st65-23':
        ind = 0;
        info1 = nutriInfo3[170].name;
        info2 = nutriInfo3[170].percentage;
        changeText(info1, info2);
        ind = 605;
        break;

        case 'st65-24':
        ind = 0;
        info1 = nutriInfo3[171].name;
        info2 = nutriInfo3[171].percentage;
        changeText(info1, info2);
        ind = 606;
        break;

        case 'st65-180':
        ind = 0;
        info1 = nutriInfo3[172].name;
        info2 = nutriInfo3[172].percentage;
        changeText(info1, info2);
        ind = 607;
        break;

        case 'st65-21':
        ind = 0;
        info1 = nutriInfo3[173].name;
        info2 = nutriInfo3[173].percentage;
        changeText(info1, info2);
        ind = 608;
        break;

        case 'st65-22':
        ind = 0;
        info1 = nutriInfo3[174].name;
        info2 = nutriInfo3[174].percentage;
        changeText(info1, info2);
        ind = 609;
        break;

        case 'st66-14':
        ind = 0;
        info1 = nutriInfo3[175].name;
        info2 = nutriInfo3[175].percentage;
        changeText(info1, info2);
        ind = 610;
        break;

        case 'st66-16':
        ind = 0;
        info1 = nutriInfo3[176].name;
        info2 = nutriInfo3[176].percentage;
        changeText(info1, info2);
        ind = 611;
        break;

        case 'st66-17':
        ind = 0;
        info1 = nutriInfo3[177].name;
        info2 = nutriInfo3[177].percentage;
        changeText(info1, info2);
        ind = 612;
        break;

        case 'st66-20':
        ind = 0;
        info1 = nutriInfo3[178].name;
        info2 = nutriInfo3[178].percentage;
        changeText(info1, info2);
        ind = 613;
        break;

        case 'st66-25':
        ind = 0;
        info1 = nutriInfo3[179].name;
        info2 = nutriInfo3[179].percentage;
        changeText(info1, info2);
        ind = 614;
        break;

        case 'st66-35':
        ind = 0;
        info1 = nutriInfo3[180].name;
        info2 = nutriInfo3[180].percentage;
        changeText(info1, info2);
        ind = 615;
        break;

        case 'st66-26':
        ind = 0;
        info1 = nutriInfo3[181].name;
        info2 = nutriInfo3[181].percentage;
        changeText(info1, info2);
        ind = 616;
        break;

        case 'st66-18':
        ind = 0;
        info1 = nutriInfo3[182].name;
        info2 = nutriInfo3[182].percentage;
        changeText(info1, info2);
        ind = 617;
        break;

        case 'st66-19':
        ind = 0;
        info1 = nutriInfo3[183].name;
        info2 = nutriInfo3[183].percentage;
        changeText(info1, info2);
        ind = 618;
        break;

        case 'st66-23':
        ind = 0;
        info1 = nutriInfo3[184].name;
        info2 = nutriInfo3[184].percentage;
        changeText(info1, info2);
        ind = 619;
        break;

        case 'st66-24':
        ind = 0;
        info1 = nutriInfo3[185].name;
        info2 = nutriInfo3[185].percentage;
        changeText(info1, info2);
        ind = 620;
        break;

        case 'st66-21':
        ind = 0;
        info1 = nutriInfo3[186].name;
        info2 = nutriInfo3[186].percentage;
        changeText(info1, info2);
        ind = 621;
        break;

        case 'st66-22':
        ind = 0;
        info1 = nutriInfo3[187].name;
        info2 = nutriInfo3[187].percentage;
        changeText(info1, info2);
        ind = 622;
        break;

        case 'st67-16':
        ind = 0;
        info1 = nutriInfo3[188].name;
        info2 = nutriInfo3[188].percentage;
        changeText(info1, info2);
        ind = 623;
        break;

        case 'st67-17':
        ind = 0;
        info1 = nutriInfo3[189].name;
        info2 = nutriInfo3[189].percentage;
        changeText(info1, info2);
        ind = 624;
        break;

        case 'st67-25':
        ind = 0;
        info1 = nutriInfo3[190].name;
        info2 = nutriInfo3[190].percentage;
        changeText(info1, info2);
        ind = 625;
        break;

        case 'st67-31':
        ind = 0;
        info1 = nutriInfo3[191].name;
        info2 = nutriInfo3[191].percentage;
        changeText(info1, info2);
        ind = 626;
        break;

        case 'st67-36':
        ind = 0;
        info1 = nutriInfo3[192].name;
        info2 = nutriInfo3[192].percentage;
        changeText(info1, info2);
        ind = 627;
        break;

        case 'st67-18':
        ind = 0;
        info1 = nutriInfo3[193].name;
        info2 = nutriInfo3[193].percentage;
        changeText(info1, info2);
        ind = 628;
        break;

        case 'st67-21':
        ind = 0;
        info1 = nutriInfo3[194].name;
        info2 = nutriInfo3[194].percentage;
        changeText(info1, info2);
        ind = 629;
        break;

        case 'st67-22':
        ind = 0;
        info1 = nutriInfo3[195].name;
        info2 = nutriInfo3[195].percentage;
        changeText(info1, info2);
        ind = 630;
        break;

        case 'st68-28':
        ind = 0;
        info1 = nutriInfo3[196].name;
        info2 = nutriInfo3[196].percentage;
        changeText(info1, info2);
        ind = 631;
        break;

        case 'st68-16':
        ind = 0;
        info1 = nutriInfo3[197].name;
        info2 = nutriInfo3[197].percentage;
        changeText(info1, info2);
        ind = 632;
        break;

        case 'st68-17':
        ind = 0;
        info1 = nutriInfo3[198].name;
        info2 = nutriInfo3[198].percentage;
        changeText(info1, info2);
        ind = 633;
        break;

        case 'st68-29':
        ind = 0;
        info1 = nutriInfo3[199].name;
        info2 = nutriInfo3[199].percentage;
        changeText(info1, info2);
        ind = 634;
        break;

        case 'st68-31':
        ind = 0;
        info1 = nutriInfo3[200].name;
        info2 = nutriInfo3[200].percentage;
        changeText(info1, info2);
        ind = 635;
        break;

        case 'st68-36':
        ind = 0;
        info1 = nutriInfo3[201].name;
        info2 = nutriInfo3[201].percentage;
        changeText(info1, info2);
        ind = 636;
        break;

        case 'st68-26':
        ind = 0;
        info1 = nutriInfo3[202].name;
        info2 = nutriInfo3[202].percentage;
        changeText(info1, info2);
        ind = 637;
        break;

        case 'st68-19':
        ind = 0;
        info1 = nutriInfo3[203].name;
        info2 = nutriInfo3[203].percentage;
        changeText(info1, info2);
        ind = 638;
        break;

        case 'st68-24':
        ind = 0;
        info1 = nutriInfo3[204].name;
        info2 = nutriInfo3[204].percentage;
        changeText(info1, info2);
        ind = 639;
        break;

        case 'st68-21':
        ind = 0;
        info1 = nutriInfo3[205].name;
        info2 = nutriInfo3[205].percentage;
        changeText(info1, info2);
        ind = 640;
        break;

        case 'st68-22':
        ind = 0;
        info1 = nutriInfo3[206].name;
        info2 = nutriInfo3[206].percentage;
        changeText(info1, info2);
        ind = 641;
        break;

        case 'st70-14':
        ind = 0;
        info1 = nutriInfo3[207].name;
        info2 = nutriInfo3[207].percentage;
        changeText(info1, info2);
        ind = 642;
        break;

        case 'st70-31':
        ind = 0;
        info1 = nutriInfo3[208].name;
        info2 = nutriInfo3[208].percentage;
        changeText(info1, info2);
        ind = 643;
        break;

        case 'st70-39':
        ind = 0;
        info1 = nutriInfo3[209].name;
        info2 = nutriInfo3[209].percentage;
        changeText(info1, info2);
        ind = 644;
        break;

        case 'st70-40':
        ind = 0;
        info1 = nutriInfo3[210].name;
        info2 = nutriInfo3[210].percentage;
        changeText(info1, info2);
        ind = 645;
        break;

        case 'st70-34':
        ind = 0;
        info1 = nutriInfo3[211].name;
        info2 = nutriInfo3[211].percentage;
        changeText(info1, info2);
        ind = 646;
        break;

        case 'st70-23':
        ind = 0;
        info1 = nutriInfo3[212].name;
        info2 = nutriInfo3[212].percentage;
        changeText(info1, info2);
        ind = 647;
        break;

        case 'st70-36':
        ind = 0;
        info1 = nutriInfo3[213].name;
        info2 = nutriInfo3[213].percentage;
        changeText(info1, info2);
        ind = 648;
        break;

        case 'st71-28':
        ind = 0;
        info1 = nutriInfo3[214].name;
        info2 = nutriInfo3[214].percentage;
        changeText(info1, info2);
        ind = 649;
        break;

        case 'st71-16':
        ind = 0;
        info1 = nutriInfo3[215].name;
        info2 = nutriInfo3[215].percentage;
        changeText(info1, info2);
        ind = 650;
        break;

        case 'st71-35':
        ind = 0;
        info1 = nutriInfo3[216].name;
        info2 = nutriInfo3[216].percentage;
        changeText(info1, info2);
        ind = 651;
        break;

        case 'st71-31':
        ind = 0;
        info1 = nutriInfo3[217].name;
        info2 = nutriInfo3[217].percentage;
        changeText(info1, info2);
        ind = 652;
        break;

        case 'st71-18':
        ind = 0;
        info1 = nutriInfo3[218].name;
        info2 = nutriInfo3[218].percentage;
        changeText(info1, info2);
        ind = 653;
        break;

        case 'st71-19':
        ind = 0;
        info1 = nutriInfo3[219].name;
        info2 = nutriInfo3[219].percentage;
        changeText(info1, info2);
        ind = 654;
        break;

        case 'st71-24':
        ind = 0;
        info1 = nutriInfo3[220].name;
        info2 = nutriInfo3[220].percentage;
        changeText(info1, info2);
        ind = 655;
        break;

        case 'st71-21':
        ind = 0;
        info1 = nutriInfo3[221].name;
        info2 = nutriInfo3[221].percentage;
        changeText(info1, info2);
        ind = 656;
        break;

        case 'st71-22':
        ind = 0;
        info1 = nutriInfo3[222].name;
        info2 = nutriInfo3[222].percentage;
        changeText(info1, info2);
        ind = 657;
        break;

        case 'st72-16':
        ind = 0;
        info1 = nutriInfo3[223].name;
        info2 = nutriInfo3[223].percentage;
        changeText(info1, info2);
        ind = 658;
        break;

        case 'st72-17':
        ind = 0;
        info1 = nutriInfo3[224].name;
        info2 = nutriInfo3[224].percentage;
        changeText(info1, info2);
        ind = 659;
        break;

        case 'st72-25':
        ind = 0;
        info1 = nutriInfo3[225].name;
        info2 = nutriInfo3[225].percentage;
        changeText(info1, info2);
        ind = 660;
        break;

        case 'st72-32':
        ind = 0;
        info1 = nutriInfo3[226].name;
        info2 = nutriInfo3[226].percentage;
        changeText(info1, info2);
        ind = 661;
        break;

        case 'st72-29':
        ind = 0;
        info1 = nutriInfo3[227].name;
        info2 = nutriInfo3[227].percentage;
        changeText(info1, info2);
        ind = 662;
        break;

        case 'st72-35':
        ind = 0;
        info1 = nutriInfo3[228].name;
        info2 = nutriInfo3[228].percentage;
        changeText(info1, info2);
        ind = 663;
        break;

        case 'st72-31':
        ind = 0;
        info1 = nutriInfo3[229].name;
        info2 = nutriInfo3[229].percentage;
        changeText(info1, info2);
        ind = 664;
        break;

        case 'st72-27':
        ind = 0;
        info1 = nutriInfo3[230].name;
        info2 = nutriInfo3[230].percentage;
        changeText(info1, info2);
        ind = 665;
        break;

        case 'st72-30':
        ind = 0;
        info1 = nutriInfo3[231].name;
        info2 = nutriInfo3[231].percentage;
        changeText(info1, info2);
        ind = 666;
        break;

        case 'st72-33':
        ind = 0;
        info1 = nutriInfo3[232].name;
        info2 = nutriInfo3[232].percentage;
        changeText(info1, info2);
        ind = 667;
        break;

        case 'st72-26':
        ind = 0;
        info1 = nutriInfo3[233].name;
        info2 = nutriInfo3[233].percentage;
        changeText(info1, info2);
        ind = 668;
        break;

        case 'st72-18':
        ind = 0;
        info1 = nutriInfo3[234].name;
        info2 = nutriInfo3[234].percentage;
        changeText(info1, info2);
        ind = 669;
        break;

        case 'st72-19':
        ind = 0;
        info1 = nutriInfo3[235].name;
        info2 = nutriInfo3[235].percentage;
        changeText(info1, info2);
        ind = 670;
        break;

        case 'st72-23':
        ind = 0;
        info1 = nutriInfo3[236].name;
        info2 = nutriInfo3[236].percentage;
        changeText(info1, info2);
        ind = 671;
        break;

        case 'st72-24':
        ind = 0;
        info1 = nutriInfo3[237].name;
        info2 = nutriInfo3[237].percentage;
        changeText(info1, info2);
        ind = 672;
        break;

        case 'st72-180':
        ind = 0;
        info1 = nutriInfo3[238].name;
        info2 = nutriInfo3[238].percentage;
        changeText(info1, info2);
        ind = 673;
        break;

        case 'st72-21':
        ind = 0;
        info1 = nutriInfo3[239].name;
        info2 = nutriInfo3[239].percentage;
        changeText(info1, info2);
        ind = 674;
        break;

        case 'st72-22':
        ind = 0;
        info1 = nutriInfo3[240].name;
        info2 = nutriInfo3[240].percentage;
        changeText(info1, info2);
        ind = 675;
        break;

        case 'st73-28':
        ind = 0;
        info1 = nutriInfo3[241].name;
        info2 = nutriInfo3[241].percentage;
        changeText(info1, info2);
        ind = 676;
        break;

        case 'st73-16':
        ind = 0;
        info1 = nutriInfo3[242].name;
        info2 = nutriInfo3[242].percentage;
        changeText(info1, info2);
        ind = 677;
        break;
        
        case 'st73-29':
        ind = 0;
        info1 = nutriInfo3[243].name;
        info2 = nutriInfo3[243].percentage;
        changeText(info1, info2);
        ind = 678;
        break;

        case 'st73-26':
        ind = 0;
        info1 = nutriInfo3[244].name;
        info2 = nutriInfo3[244].percentage;
        changeText(info1, info2);
        ind = 679;
        break;

        case 'st73-18':
        ind = 0;
        info1 = nutriInfo3[245].name;
        info2 = nutriInfo3[245].percentage;
        changeText(info1, info2);
        ind = 680;
        break;

        case 'st73-19':
        ind = 0;
        info1 = nutriInfo3[246].name;
        info2 = nutriInfo3[246].percentage;
        changeText(info1, info2);
        ind = 681;
        break;

        case 'st73-23':
        ind = 0;
        info1 = nutriInfo3[247].name;
        info2 = nutriInfo3[247].percentage;
        changeText(info1, info2);
        ind = 682;
        break;

        case 'st73-24':
        ind = 0;
        info1 = nutriInfo3[248].name;
        info2 = nutriInfo3[248].percentage;
        changeText(info1, info2);
        ind = 683;
        break;

        case 'st73-21':
        ind = 0;
        info1 = nutriInfo3[249].name;
        info2 = nutriInfo3[249].percentage;
        changeText(info1, info2);
        ind = 684;
        break;

        case 'st73-22':
        ind = 0;
        info1 = nutriInfo3[250].name;
        info2 = nutriInfo3[250].percentage;
        changeText(info1, info2);
        ind = 685;
        break;

        case 'st74-28':
        ind = 0;
        info1 = nutriInfo3[251].name;
        info2 = nutriInfo3[251].percentage;
        changeText(info1, info2);
        ind = 686;
        break;

        case 'st74-17':
        ind = 0;
        info1 = nutriInfo3[252].name;
        info2 = nutriInfo3[252].percentage;
        changeText(info1, info2);
        ind = 687;
        break;

        case 'st74-24':
        ind = 0;
        info1 = nutriInfo3[253].name;
        info2 = nutriInfo3[253].percentage;
        changeText(info1, info2);
        ind = 688;
        break;

        case 'st75-14':
        ind = 0;
        info1 = nutriInfo3[254].name;
        info2 = nutriInfo3[254].percentage;
        changeText(info1, info2);
        ind = 689;
        break;

        case 'st75-28':
        ind = 0;
        info1 = nutriInfo3[255].name;
        info2 = nutriInfo3[255].percentage;
        changeText(info1, info2);
        ind = 690;
        break;

        case 'st75-16':
        ind = 0;
        info1 = nutriInfo3[256].name;
        info2 = nutriInfo3[256].percentage;
        changeText(info1, info2);
        ind = 691;
        break;

        case 'st75-25':
        ind = 0;
        info1 = nutriInfo3[257].name;
        info2 = nutriInfo3[257].percentage;
        changeText(info1, info2);
        ind = 692;
        break;

        case 'st75-27':
        ind = 0;
        info1 = nutriInfo3[258].name;
        info2 = nutriInfo3[258].percentage;
        changeText(info1, info2);
        ind = 693;
        break;

        case 'st75-30':
        ind = 0;
        info1 = nutriInfo3[259].name;
        info2 = nutriInfo3[259].percentage;
        changeText(info1, info2);
        ind = 694;
        break;

        case 'st75-33':
        ind = 0;
        info1 = nutriInfo3[260].name;
        info2 = nutriInfo3[260].percentage;
        changeText(info1, info2);
        ind = 695;
        break;

        case 'st75-26':
        ind = 0;
        info1 = nutriInfo3[261].name;
        info2 = nutriInfo3[261].percentage;
        changeText(info1, info2);
        ind = 696;
        break;

        case 'st75-18':
        ind = 0;
        info1 = nutriInfo3[262].name;
        info2 = nutriInfo3[262].percentage;
        changeText(info1, info2);
        ind = 697;
        break;

        case 'st75-19':
        ind = 0;
        info1 = nutriInfo3[263].name;
        info2 = nutriInfo3[263].percentage;
        changeText(info1, info2);
        ind = 698;
        break;

        case 'st75-180':
        ind = 0;
        info1 = nutriInfo3[264].name;
        info2 = nutriInfo3[264].percentage;
        changeText(info1, info2);
        ind = 699;
        break;

        case 'st75-21':
        ind = 0;
        info1 = nutriInfo3[265].name;
        info2 = nutriInfo3[265].percentage;
        changeText(info1, info2);
        ind = 700;
        break;

        case 'st75-22':
        ind = 0;
        info1 = nutriInfo3[266].name;
        info2 = nutriInfo3[266].percentage;
        changeText(info1, info2);
        ind = 701;
        break;

        case 'st76-16':
        ind = 0;
        info1 = nutriInfo3[267].name;
        info2 = nutriInfo3[267].percentage;
        changeText(info1, info2);
        ind = 702;
        break;

        case 'st76-17':
        ind = 0;
        info1 = nutriInfo3[268].name;
        info2 = nutriInfo3[268].percentage;
        changeText(info1, info2);
        ind = 703;
        break;

        case 'st76-24':
        ind = 0;
        info1 = nutriInfo3[269].name;
        info2 = nutriInfo3[269].percentage;
        changeText(info1, info2);
        ind = 704;
        break;

        case 'st76-21':
        ind = 0;
        info1 = nutriInfo3[270].name;
        info2 = nutriInfo3[270].percentage;
        changeText(info1, info2);
        ind = 705;
        break;

        case 'st77-16':
        ind = 0;
        info1 = nutriInfo3[271].name;
        info2 = nutriInfo3[271].percentage;
        changeText(info1, info2);
        ind = 706;
        break;

        case 'st77-17':
        ind = 0;
        info1 = nutriInfo3[272].name;
        info2 = nutriInfo3[272].percentage;
        changeText(info1, info2);
        ind = 707;
        break;

        case 'st77-32':
        ind = 0;
        info1 = nutriInfo3[273].name;
        info2 = nutriInfo3[273].percentage;
        changeText(info1, info2);
        ind = 708;
        break;

        case 'st77-29':
        ind = 0;
        info1 = nutriInfo3[274].name;
        info2 = nutriInfo3[274].percentage;
        changeText(info1, info2);
        ind = 709;
        break;

        case 'st77-31':
        ind = 0;
        info1 = nutriInfo3[275].name;
        info2 = nutriInfo3[275].percentage;
        changeText(info1, info2);
        ind = 710;
        break;

        case 'st77-21':
        ind = 0;
        info1 = nutriInfo3[276].name;
        info2 = nutriInfo3[276].percentage;
        changeText(info1, info2);
        ind = 711;
        break;

        case 'st78-14':
        ind = 0;
        info1 = nutriInfo3[277].name;
        info2 = nutriInfo3[277].percentage;
        changeText(info1, info2);
        ind = 712;
        break;

        case 'st78-28':
        ind = 0;
        info1 = nutriInfo3[278].name;
        info2 = nutriInfo3[278].percentage;
        changeText(info1, info2);
        ind = 713;
        break;

        case 'st78-16':
        ind = 0;
        info1 = nutriInfo3[279].name;
        info2 = nutriInfo3[279].percentage;
        changeText(info1, info2);
        ind = 714;
        break;

        case 'st78-17':
        ind = 0;
        info1 = nutriInfo3[280].name;
        info2 = nutriInfo3[280].percentage;
        changeText(info1, info2);
        ind = 714;
        break;

        case 'st78-29':
        ind = 0;
        info1 = nutriInfo3[281].name;
        info2 = nutriInfo3[281].percentage;
        changeText(info1, info2);
        ind = 715;
        break;

        case 'st78-18':
        ind = 0;
        info1 = nutriInfo3[282].name;
        info2 = nutriInfo3[282].percentage;
        changeText(info1, info2);
        ind = 716;
        break;

        case 'st79-14':
        ind = 0;
        info1 = nutriInfo3[283].name;
        info2 = nutriInfo3[283].percentage;
        changeText(info1, info2);
        ind = 717;
        break;

        case 'st79-28':
        ind = 0;
        info1 = nutriInfo3[284].name;
        info2 = nutriInfo3[284].percentage;
        changeText(info1, info2);
        ind = 718;
        break;

        case 'st79-16':
        ind = 0;
        info1 = nutriInfo3[285].name;
        info2 = nutriInfo3[285].percentage;
        changeText(info1, info2);
        ind = 719;
        break;

        case 'st79-17':
        ind = 0;
        info1 = nutriInfo3[286].name;
        info2 = nutriInfo3[286].percentage;
        changeText(info1, info2);
        ind = 720;
        break;

        case 'st79-29':
        ind = 0;
        info1 = nutriInfo3[287].name;
        info2 = nutriInfo3[287].percentage;
        changeText(info1, info2);
        ind = 721;
        break;

        case 'st80-14':
        ind = 0;
        info1 = nutriInfo3[288].name;
        info2 = nutriInfo3[288].percentage;
        changeText(info1, info2);
        ind = 722;
        break;

        case 'st80-16':
        ind = 0;
        info1 = nutriInfo3[289].name;
        info2 = nutriInfo3[289].percentage;
        changeText(info1, info2);
        ind = 723;
        break;

        case 'st80-20':
        ind = 0;
        info1 = nutriInfo3[290].name;
        info2 = nutriInfo3[290].percentage;
        changeText(info1, info2);
        ind = 724;
        break;

        case 'st80-25':
        ind = 0;
        info1 = nutriInfo3[291].name;
        info2 = nutriInfo3[291].percentage;
        changeText(info1, info2);
        ind = 725;
        break;

        case 'st80-26':
        ind = 0;
        info1 = nutriInfo3[292].name;
        info2 = nutriInfo3[292].percentage;
        changeText(info1, info2);
        ind = 726;
        break;

        case 'st81-14':
        ind = 0;
        info1 = nutriInfo3[293].name;
        info2 = nutriInfo3[293].percentage;
        changeText(info1, info2);
        ind = 727;
        break;

        case 'st81-16':
        ind = 0;
        info1 = nutriInfo3[294].name;
        info2 = nutriInfo3[294].percentage;
        changeText(info1, info2);
        ind = 728;
        break;

        case 'st81-17':
        ind = 0;
        info1 = nutriInfo3[295].name;
        info2 = nutriInfo3[295].percentage;
        changeText(info1, info2);
        ind = 729;
        break;

        case 'st81-20':
        ind = 0;
        info1 = nutriInfo3[296].name;
        info2 = nutriInfo3[296].percentage;
        changeText(info1, info2);
        ind = 730;
        break;

        case 'st81-18':
        ind = 0;
        info1 = nutriInfo3[297].name;
        info2 = nutriInfo3[297].percentage;
        changeText(info1, info2);
        ind = 731;
        break;

        case 'st81-19':
        ind = 0;
        info1 = nutriInfo3[298].name;
        info2 = nutriInfo3[298].percentage;
        changeText(info1, info2);
        ind = 732;
        break;

        case 'st81-21':
        ind = 0;
        info1 = nutriInfo3[299].name;
        info2 = nutriInfo3[299].percentage;
        changeText(info1, info2);
        ind = 733;
        break;

        case 'st81-22':
        ind = 0;
        info1 = nutriInfo3[300].name;
        info2 = nutriInfo3[300].percentage;
        changeText(info1, info2);
        ind = 734;
        break;
        

        case 'st10 st70 st71':
        info1 = foodInfo[0]["gi-level"]
        info2 = foodInfo[0].color
        info3 = foodInfo[0].category
        info4 = foodInfo[0].amount
        info5 = foodInfo[0].url
        changeText2(info1,info2,info3,info4,info5)
        break;

        
    }
    // console.log(ind)

    // row1
    ring = drawRingchart('ringchart',ind);
    positionPopUp('myicon','popup_left')
    positionPopUp('myicon2','popup_left')
    positionPopUp('myicon3','popup_left')
    positionPopUp('myicon4','popup_left')
    positionPopUp('myicon5','popup_left')
    positionPopUp('myicon6','popup_left')
    positionPopUp('myicon7','popup_left')
    positionPopUp('myicon8','popup_left')
    positionPopUp('myicon9','popup_left')
    positionPopUp('myicon10','popup_left')
    positionPopUp('myicon11','popup_left')
    positionPopUp('myicon12','popup_left')
    positionPopUp('myicon13','popup_left')
    
    //row2
    positionPopUp('myicon2-0','popup_left')
    positionPopUp('myicon2-1','popup_left')
    positionPopUp('myicon2-2','popup_left')
    positionPopUp('myicon2-3','popup_left')
    positionPopUp('myicon2-4','popup_left')
    positionPopUp('myicon2-5','popup_left')
    positionPopUp('myicon2-6','popup_left')
    positionPopUp('myicon2-7','popup_left')
    positionPopUp('myicon2-8','popup_left')
    positionPopUp('myicon2-9','popup_left')
    positionPopUp('myicon2-10','popup_left')
    positionPopUp('myicon2-11','popup_left')

    //row3
    positionPopUp('myicon3-0','popup_left')
    positionPopUp('myicon3-1','popup_left')
    positionPopUp('myicon3-2','popup_left')
    positionPopUp('myicon3-3','popup_left')
    positionPopUp('myicon3-4','popup_left')
    positionPopUp('myicon3-5','popup_left')
    positionPopUp('myicon3-6','popup_left')
    positionPopUp('myicon3-7','popup_left')
    positionPopUp('myicon3-8','popup_left')
    positionPopUp('myicon3-9','popup_left')

    //row4
    positionPopUp('myicon4-0','popup_left')

    //row5
    positionPopUp('myicon5-0','popup_left')
    positionPopUp('myicon5-1','popup_left')
    positionPopUp('myicon5-2','popup_left')
    positionPopUp('myicon5-3','popup_left')
    positionPopUp('myicon5-4','popup_left')

    //row6
    positionPopUp('myicon6-0','popup_left')
    positionPopUp('myicon6-1','popup_left')
    positionPopUp('myicon6-2','popup_left')
    positionPopUp('myicon6-3','popup_left')
    positionPopUp('myicon6-4','popup_left')
    positionPopUp('myicon6-5','popup_left')
    positionPopUp('myicon6-6','popup_left')
    positionPopUp('myicon6-7','popup_left')
    positionPopUp('myicon6-8','popup_left')
    positionPopUp('myicon6-9','popup_left')
    positionPopUp('myicon6-10','popup_left')

    //row7
    positionPopUp('myicon7-0','popup_left')
    positionPopUp('myicon7-1','popup_left')
    positionPopUp('myicon7-2','popup_left')
    positionPopUp('myicon7-3','popup_left')
    positionPopUp('myicon7-4','popup_left')
    positionPopUp('myicon7-5','popup_left')
    positionPopUp('myicon7-6','popup_left')
    positionPopUp('myicon7-7','popup_left')
    positionPopUp('myicon7-8','popup_left')
    positionPopUp('myicon7-9','popup_left')
    positionPopUp('myicon7-10','popup_left')

    //row8
    positionPopUp('myicon8-0','popup_left')
    positionPopUp('myicon8-1','popup_left')
    positionPopUp('myicon8-2','popup_left')
    positionPopUp('myicon8-3','popup_left')
    positionPopUp('myicon8-4','popup_left')
    positionPopUp('myicon8-5','popup_left')
    positionPopUp('myicon8-6','popup_left')
    positionPopUp('myicon8-7','popup_left')

    //row9
    positionPopUp('myicon9-0','popup_left')
    positionPopUp('myicon9-1','popup_left')
    positionPopUp('myicon9-2','popup_left')
    positionPopUp('myicon9-3','popup_left')
    positionPopUp('myicon9-4','popup_left')
    positionPopUp('myicon9-5','popup_left')
    positionPopUp('myicon9-6','popup_left')
    positionPopUp('myicon9-7','popup_left')
    positionPopUp('myicon9-8','popup_left')
    positionPopUp('myicon9-9','popup_left')
    positionPopUp('myicon9-10','popup_left')
    positionPopUp('myicon9-11','popup_left')
    positionPopUp('myicon9-12','popup_left')

    //row10
    positionPopUp('myicon10-0','popup_left')
    positionPopUp('myicon10-1','popup_left')
    positionPopUp('myicon10-2','popup_left')
    positionPopUp('myicon10-3','popup_left')
    positionPopUp('myicon10-4','popup_left')
    positionPopUp('myicon10-5','popup_left')
    positionPopUp('myicon10-6','popup_left')

    //row11 
    positionPopUp('myicon11-0','popup_left')
    positionPopUp('myicon11-1','popup_left')
    positionPopUp('myicon11-2','popup_left')
    positionPopUp('myicon11-3','popup_left')
    positionPopUp('myicon11-4','popup_left')

    //row12
    positionPopUp('myicon12-0','popup_left')
    positionPopUp('myicon12-1','popup_left')
    positionPopUp('myicon12-2','popup_left')
    positionPopUp('myicon12-3','popup_left')
    positionPopUp('myicon12-4','popup_left')
    positionPopUp('myicon12-5','popup_left')
    positionPopUp('myicon12-6','popup_left')
    positionPopUp('myicon12-7','popup_left')
    positionPopUp('myicon12-8','popup_left')
    positionPopUp('myicon12-9','popup_left')
    positionPopUp('myicon12-10','popup_left')
    positionPopUp('myicon12-11','popup_left')

    //row13
    positionPopUp('myicon13-0','popup_left')
    positionPopUp('myicon13-1','popup_left')
    positionPopUp('myicon13-2','popup_left')
    positionPopUp('myicon13-3','popup_left')
    positionPopUp('myicon13-4','popup_left')

    //row14
    positionPopUp('myicon14-0','popup_left')
    positionPopUp('myicon14-1','popup_left')
    positionPopUp('myicon14-2','popup_left')
    positionPopUp('myicon14-3','popup_left')
    positionPopUp('myicon14-4','popup_left')
    positionPopUp('myicon14-5','popup_left')
    positionPopUp('myicon14-6','popup_left')
    positionPopUp('myicon14-7','popup_left')
    positionPopUp('myicon14-8','popup_left')
    positionPopUp('myicon14-9','popup_left')
    positionPopUp('myicon14-10','popup_left')
    positionPopUp('myicon14-11','popup_left')
    positionPopUp('myicon14-12','popup_left')
    positionPopUp('myicon14-13','popup_left')

    //row15
    positionPopUp('myicon15-0','popup_left')
    positionPopUp('myicon15-1','popup_left')
    positionPopUp('myicon15-2','popup_left')
    positionPopUp('myicon15-3','popup_left')
    positionPopUp('myicon15-4','popup_left')
    positionPopUp('myicon15-5','popup_left')
    positionPopUp('myicon15-6','popup_left')
    positionPopUp('myicon15-7','popup_left')
    positionPopUp('myicon15-8','popup_left')
    positionPopUp('myicon15-9','popup_left')
    positionPopUp('myicon15-10','popup_left')
    positionPopUp('myicon15-11','popup_left')
    positionPopUp('myicon15-12','popup_left')
    positionPopUp('myicon15-13','popup_left')
    positionPopUp('myicon15-14','popup_left')

    //row15
    positionPopUp('myicon16-0','popup_left')
    positionPopUp('myicon16-1','popup_left')
    positionPopUp('myicon16-2','popup_left')
    positionPopUp('myicon16-3','popup_left')
    positionPopUp('myicon16-4','popup_left')
    positionPopUp('myicon16-5','popup_left')
    positionPopUp('myicon16-6','popup_left')
    positionPopUp('myicon16-7','popup_left')
    positionPopUp('myicon16-8','popup_left')
    positionPopUp('myicon16-9','popup_left')
    positionPopUp('myicon16-10','popup_left')
    positionPopUp('myicon16-11','popup_left')
    positionPopUp('myicon16-12','popup_left')
    positionPopUp('myicon16-13','popup_left')
    positionPopUp('myicon16-14','popup_left')
    positionPopUp('myicon16-15','popup_left')
    positionPopUp('myicon16-16','popup_left')
    positionPopUp('myicon16-17','popup_left')
    positionPopUp('myicon16-18','popup_left')

    //row16
    positionPopUp('myicon17-0','popup_left')
    positionPopUp('myicon17-1','popup_left')
    positionPopUp('myicon17-2','popup_left')
    positionPopUp('myicon17-3','popup_left')
    positionPopUp('myicon17-4','popup_left')
    positionPopUp('myicon17-5','popup_left')
    positionPopUp('myicon17-6','popup_left')
    positionPopUp('myicon17-7','popup_left')
    positionPopUp('myicon17-8','popup_left')
    positionPopUp('myicon17-9','popup_left')
    positionPopUp('myicon17-10','popup_left')
    positionPopUp('myicon17-11','popup_left')
    positionPopUp('myicon17-12','popup_left')
    positionPopUp('myicon17-13','popup_left')
    positionPopUp('myicon17-14','popup_left')
    positionPopUp('myicon17-15','popup_left')

    //row17
    positionPopUp('myicon18-0','popup_left')
    positionPopUp('myicon18-1','popup_left')
    positionPopUp('myicon18-2','popup_left')
    positionPopUp('myicon18-3','popup_left')
    positionPopUp('myicon18-4','popup_left')
    positionPopUp('myicon18-5','popup_left')
    positionPopUp('myicon18-6','popup_left')
    positionPopUp('myicon18-7','popup_left')
    positionPopUp('myicon18-8','popup_left')
    positionPopUp('myicon18-9','popup_left')
    positionPopUp('myicon18-10','popup_left')
    positionPopUp('myicon18-11','popup_left')
    positionPopUp('myicon18-12','popup_left')
    positionPopUp('myicon18-13','popup_left')

    //row18
    positionPopUp('myicon19-0','popup_left')
    positionPopUp('myicon19-1','popup_left')
    positionPopUp('myicon19-2','popup_left')
    positionPopUp('myicon19-3','popup_left')
    positionPopUp('myicon19-4','popup_left')
    positionPopUp('myicon19-5','popup_left')
    positionPopUp('myicon19-6','popup_left')
    positionPopUp('myicon19-7','popup_left')
    positionPopUp('myicon19-8','popup_left')
    positionPopUp('myicon19-9','popup_left')
    positionPopUp('myicon19-10','popup_left')
    positionPopUp('myicon19-11','popup_left')
    positionPopUp('myicon19-12','popup_left')
    positionPopUp('myicon19-13','popup_left')

    //row19
    positionPopUp('myicon20-0','popup_left')
    positionPopUp('myicon20-1','popup_left')
    positionPopUp('myicon20-2','popup_left')
    positionPopUp('myicon20-3','popup_left')
    positionPopUp('myicon20-4','popup_left')
    positionPopUp('myicon20-5','popup_left')
    positionPopUp('myicon20-6','popup_left')
    positionPopUp('myicon20-7','popup_left')
    positionPopUp('myicon20-8','popup_left')
    positionPopUp('myicon20-9','popup_left')
    positionPopUp('myicon20-10','popup_left')
    positionPopUp('myicon20-11','popup_left')
    positionPopUp('myicon20-12','popup_left')

    //row20
    positionPopUp('myicon21-0','popup_left')
    positionPopUp('myicon21-1','popup_left')
    positionPopUp('myicon21-2','popup_left')
    positionPopUp('myicon21-3','popup_left')
    positionPopUp('myicon21-4','popup_left')
    positionPopUp('myicon21-5','popup_left')
    positionPopUp('myicon21-6','popup_left')

    //row21
    positionPopUp('myicon22-0','popup_left')
    positionPopUp('myicon22-1','popup_left')
    positionPopUp('myicon22-2','popup_left')
    positionPopUp('myicon22-3','popup_left')
    positionPopUp('myicon22-4','popup_left')
    positionPopUp('myicon22-5','popup_left')
    positionPopUp('myicon22-6','popup_left')
    positionPopUp('myicon22-7','popup_left')
    positionPopUp('myicon22-8','popup_left')
    positionPopUp('myicon22-9','popup_left')

    //row22
    positionPopUp('myicon22-0','popup_left')
    positionPopUp('myicon22-1','popup_left')
    positionPopUp('myicon22-2','popup_left')
    positionPopUp('myicon22-3','popup_left')
    positionPopUp('myicon22-4','popup_left')
    positionPopUp('myicon22-5','popup_left')
    positionPopUp('myicon22-6','popup_left')
    positionPopUp('myicon22-7','popup_left')
    positionPopUp('myicon22-8','popup_left')

    //row22
    positionPopUp('myicon23-0','popup_left')
    positionPopUp('myicon23-1','popup_left')
    positionPopUp('myicon23-2','popup_left')
    positionPopUp('myicon23-3','popup_left')
    positionPopUp('myicon23-4','popup_left')
    positionPopUp('myicon23-5','popup_left')
    positionPopUp('myicon23-6','popup_left')
    positionPopUp('myicon23-7','popup_left')
    positionPopUp('myicon23-8','popup_left')

    //row23
    positionPopUp('myicon24-0','popup_left')
    positionPopUp('myicon24-1','popup_left')
    positionPopUp('myicon24-2','popup_left')
    positionPopUp('myicon24-3','popup_left')
    positionPopUp('myicon24-4','popup_left')
    positionPopUp('myicon24-5','popup_left')
    positionPopUp('myicon24-6','popup_left')
    positionPopUp('myicon24-7','popup_left')
    positionPopUp('myicon24-8','popup_left')

    //row24
    positionPopUp('myicon25-0','popup_left')
    positionPopUp('myicon25-1','popup_left')

    //row25
    positionPopUp('myicon26-0','popup_left')
    positionPopUp('myicon26-1','popup_left')

    //row26
    positionPopUp('myicon27-0','popup_left')

    //row27
    positionPopUp('myicon28-0','popup_left')
    positionPopUp('myicon28-1','popup_left')
    positionPopUp('myicon28-2','popup_left')
    positionPopUp('myicon28-3','popup_left')

    //row28
    positionPopUp('myicon29-0','popup_left')
    positionPopUp('myicon29-1','popup_left')
    positionPopUp('myicon29-2','popup_left')

     //row31
     positionPopUp('myicon31-0','popup_left')
     positionPopUp('myicon31-1','popup_left')
     positionPopUp('myicon31-2','popup_left')
     positionPopUp('myicon31-3','popup_left')
     positionPopUp('myicon31-4','popup_left')
     positionPopUp('myicon31-5','popup_left')
     positionPopUp('myicon31-6','popup_left')
     positionPopUp('myicon31-7','popup_left')
     positionPopUp('myicon31-8','popup_left')
    
     //row32
     positionPopUp('myicon32-0','popup_left')
     positionPopUp('myicon32-1','popup_left')
     positionPopUp('myicon32-2','popup_left')
     positionPopUp('myicon32-3','popup_left')
     positionPopUp('myicon32-4','popup_left')
     positionPopUp('myicon32-5','popup_left')
     positionPopUp('myicon32-6','popup_left')
     positionPopUp('myicon32-7','popup_left')
     positionPopUp('myicon32-8','popup_left')
     positionPopUp('myicon32-9','popup_left')
     positionPopUp('myicon32-10','popup_left')
     positionPopUp('myicon32-11','popup_left')
     positionPopUp('myicon32-12','popup_left')
     positionPopUp('myicon32-13','popup_left')
     positionPopUp('myicon32-14','popup_left')
     positionPopUp('myicon32-15','popup_left')

     //row33
     positionPopUp('myicon33-0','popup_left')
     positionPopUp('myicon33-1','popup_left')
     positionPopUp('myicon33-2','popup_left')
     positionPopUp('myicon33-3','popup_left')
     positionPopUp('myicon33-4','popup_left')
     positionPopUp('myicon33-5','popup_left')
     positionPopUp('myicon33-6','popup_left')
     positionPopUp('myicon33-7','popup_left')
     positionPopUp('myicon33-8','popup_left')
     positionPopUp('myicon33-9','popup_left')
     positionPopUp('myicon33-10','popup_left')
     positionPopUp('myicon33-11','popup_left')
     positionPopUp('myicon33-12','popup_left')
     positionPopUp('myicon33-13','popup_left')
     positionPopUp('myicon33-14','popup_left')
     positionPopUp('myicon33-15','popup_left')
     positionPopUp('myicon33-16','popup_left')

     //row34
     positionPopUp('myicon34-0','popup_left')
     positionPopUp('myicon34-1','popup_left')
     positionPopUp('myicon34-2','popup_left')
     positionPopUp('myicon34-3','popup_left')
 
     //row35
     positionPopUp('myicon35-0','popup_left')
     positionPopUp('myicon35-1','popup_left')
     positionPopUp('myicon35-2','popup_left')
     positionPopUp('myicon35-3','popup_left')
     positionPopUp('myicon35-4','popup_left')

    //row36
    positionPopUp('myicon36-0','popup_left')
    positionPopUp('myicon36-1','popup_left')
    positionPopUp('myicon36-2','popup_left')
    positionPopUp('myicon36-3','popup_left')
    positionPopUp('myicon36-4','popup_left')
    positionPopUp('myicon36-5','popup_left')
    positionPopUp('myicon36-6','popup_left')
    positionPopUp('myicon36-7','popup_left')
    positionPopUp('myicon36-8','popup_left')
    positionPopUp('myicon36-9','popup_left')

    //row37
    positionPopUp('myicon37-0','popup_left')
    positionPopUp('myicon37-1','popup_left')
    positionPopUp('myicon37-2','popup_left')
    positionPopUp('myicon37-3','popup_left')
    positionPopUp('myicon37-4','popup_left')
    positionPopUp('myicon37-5','popup_left')
    positionPopUp('myicon37-6','popup_left')
    positionPopUp('myicon37-7','popup_left')
    positionPopUp('myicon37-8','popup_left')
    positionPopUp('myicon37-9','popup_left')
    positionPopUp('myicon37-10','popup_left')
    positionPopUp('myicon37-11','popup_left')

    //row38
    positionPopUp('myicon38-0','popup_left')
    positionPopUp('myicon38-1','popup_left')
    positionPopUp('myicon38-2','popup_left')
    positionPopUp('myicon38-3','popup_left')
    positionPopUp('myicon38-4','popup_left')
    positionPopUp('myicon38-5','popup_left')
    positionPopUp('myicon38-6','popup_left')
    positionPopUp('myicon38-7','popup_left')
    positionPopUp('myicon38-8','popup_left')
    positionPopUp('myicon38-9','popup_left')
    positionPopUp('myicon38-10','popup_left')
    positionPopUp('myicon38-11','popup_left')
    positionPopUp('myicon38-12','popup_left')
    positionPopUp('myicon38-13','popup_left')
    positionPopUp('myicon38-14','popup_left')

    //row39
    positionPopUp('myicon39-0','popup_left')

    //row40
    positionPopUp('myicon40-0','popup_left')
    positionPopUp('myicon40-1','popup_left')

    //row41
    positionPopUp('myicon41-0','popup_left')
    positionPopUp('myicon41-1','popup_left')
    positionPopUp('myicon41-2','popup_left')
    positionPopUp('myicon41-3','popup_left')
    positionPopUp('myicon41-4','popup_left')
    positionPopUp('myicon41-5','popup_left')

    //row42
    positionPopUp('myicon42-0','popup_left')
    positionPopUp('myicon42-1','popup_left')
    positionPopUp('myicon42-2','popup_left')
    positionPopUp('myicon42-3','popup_left')
    positionPopUp('myicon42-4','popup_left')
    positionPopUp('myicon42-5','popup_left')
    positionPopUp('myicon42-6','popup_left')
    positionPopUp('myicon42-7','popup_left')
    positionPopUp('myicon42-8','popup_left')

    //row43
    positionPopUp('myicon43-0','popup_left')
    positionPopUp('myicon43-1','popup_left')
    positionPopUp('myicon43-2','popup_left')

    //row44
    positionPopUp('myicon44-0','popup_left')
    positionPopUp('myicon44-1','popup_left')
    positionPopUp('myicon44-2','popup_left')
    positionPopUp('myicon44-3','popup_left')
    positionPopUp('myicon44-4','popup_left')
    positionPopUp('myicon44-5','popup_left')
    positionPopUp('myicon44-6','popup_left')
    positionPopUp('myicon44-7','popup_left')
    positionPopUp('myicon44-8','popup_left')
    positionPopUp('myicon44-9','popup_left')
    positionPopUp('myicon44-10','popup_left')
    positionPopUp('myicon44-11','popup_left')

    //row45
    positionPopUp('myicon45-0','popup_left')
    positionPopUp('myicon45-1','popup_left')

     //row46
    positionPopUp('myicon46-0','popup_left')
    positionPopUp('myicon46-1','popup_left')
    positionPopUp('myicon46-2','popup_left')
    positionPopUp('myicon46-3','popup_left')
    positionPopUp('myicon46-4','popup_left')
    positionPopUp('myicon46-5','popup_left')
    positionPopUp('myicon46-6','popup_left')
    positionPopUp('myicon46-7','popup_left')
    positionPopUp('myicon46-8','popup_left')

    //row47
    positionPopUp('myicon47-0','popup_left')

    //row48
    positionPopUp('myicon48-0','popup_left')
    positionPopUp('myicon48-1','popup_left')
    positionPopUp('myicon48-2','popup_left')
    positionPopUp('myicon48-3','popup_left')
    positionPopUp('myicon48-4','popup_left')
    positionPopUp('myicon48-5','popup_left')
    positionPopUp('myicon48-6','popup_left')
    positionPopUp('myicon48-7','popup_left')
    positionPopUp('myicon48-8','popup_left')
    positionPopUp('myicon48-9','popup_left')
    positionPopUp('myicon48-10','popup_left')
    positionPopUp('myicon48-11','popup_left')
    positionPopUp('myicon48-12','popup_left')
    positionPopUp('myicon48-13','popup_left')
    positionPopUp('myicon48-14','popup_left')
    positionPopUp('myicon48-15','popup_left')
    positionPopUp('myicon48-16','popup_left')
    positionPopUp('myicon48-17','popup_left')

    //row49
    positionPopUp('myicon49-0','popup_left')
    positionPopUp('myicon49-1','popup_left')
    positionPopUp('myicon49-2','popup_left')
    positionPopUp('myicon49-3','popup_left')
    positionPopUp('myicon49-4','popup_left')
    positionPopUp('myicon49-5','popup_left')
    positionPopUp('myicon49-6','popup_left')
    positionPopUp('myicon49-7','popup_left')
    positionPopUp('myicon49-8','popup_left')
    positionPopUp('myicon49-9','popup_left')
    positionPopUp('myicon49-10','popup_left')
    positionPopUp('myicon49-11','popup_left')
    positionPopUp('myicon49-12','popup_left')

    //row50
    positionPopUp('myicon50-0','popup_left')
    positionPopUp('myicon50-1','popup_left')

    //row51
    positionPopUp('myicon51-0','popup_left')
    positionPopUp('myicon51-1','popup_left')
    positionPopUp('myicon51-2','popup_left')
    positionPopUp('myicon51-3','popup_left')
    positionPopUp('myicon51-4','popup_left')
    positionPopUp('myicon51-5','popup_left')
    positionPopUp('myicon51-6','popup_left')
    positionPopUp('myicon51-7','popup_left')
    positionPopUp('myicon51-8','popup_left')
    positionPopUp('myicon51-9','popup_left')
    positionPopUp('myicon51-10','popup_left')
    positionPopUp('myicon51-11','popup_left')

    //row52
    positionPopUp('myicon52-0','popup_left')
    positionPopUp('myicon52-1','popup_left')
    positionPopUp('myicon52-2','popup_left')
    positionPopUp('myicon52-3','popup_left')
    positionPopUp('myicon52-4','popup_left')
    positionPopUp('myicon52-5','popup_left')
    positionPopUp('myicon52-6','popup_left')
    positionPopUp('myicon52-7','popup_left')
    positionPopUp('myicon52-8','popup_left')
    positionPopUp('myicon52-9','popup_left')
    positionPopUp('myicon52-10','popup_left')
    positionPopUp('myicon52-11','popup_left')
    positionPopUp('myicon52-12','popup_left')

    //row53
    positionPopUp('myicon53-0','popup_left')
    positionPopUp('myicon53-1','popup_left')
    positionPopUp('myicon53-2','popup_left')
    positionPopUp('myicon53-3','popup_left')
    positionPopUp('myicon53-4','popup_left')
    positionPopUp('myicon53-5','popup_left')
    positionPopUp('myicon53-6','popup_left')
    positionPopUp('myicon53-7','popup_left')
    positionPopUp('myicon53-8','popup_left')
    positionPopUp('myicon53-9','popup_left')
    positionPopUp('myicon53-10','popup_left')
    positionPopUp('myicon53-11','popup_left')
    positionPopUp('myicon53-12','popup_left')
    positionPopUp('myicon53-13','popup_left')
    positionPopUp('myicon53-14','popup_left')
    positionPopUp('myicon53-15','popup_left')
    positionPopUp('myicon53-16','popup_left')
    positionPopUp('myicon53-17','popup_left')

    //row54
    positionPopUp('myicon54-0','popup_left')
    positionPopUp('myicon54-1','popup_left')

    //row55
    positionPopUp('myicon55-0','popup_left')
    positionPopUp('myicon55-1','popup_left')
    positionPopUp('myicon55-2','popup_left')
    positionPopUp('myicon55-3','popup_left')
    positionPopUp('myicon55-4','popup_left')
    positionPopUp('myicon55-5','popup_left')
    positionPopUp('myicon55-6','popup_left')
    positionPopUp('myicon55-7','popup_left')
    positionPopUp('myicon55-8','popup_left')
    positionPopUp('myicon55-9','popup_left')
    positionPopUp('myicon55-10','popup_left')
    positionPopUp('myicon55-11','popup_left')
    positionPopUp('myicon55-12','popup_left')

    //row56
    positionPopUp('myicon56-0','popup_left')
    positionPopUp('myicon56-1','popup_left')
    positionPopUp('myicon56-2','popup_left')
    positionPopUp('myicon56-3','popup_left')
    positionPopUp('myicon56-4','popup_left')
    positionPopUp('myicon56-5','popup_left')
    positionPopUp('myicon56-6','popup_left')
    positionPopUp('myicon56-7','popup_left')

    //row58
    positionPopUp('myicon58-0','popup_left')
    positionPopUp('myicon58-1','popup_left')
    positionPopUp('myicon58-2','popup_left')
    positionPopUp('myicon58-3','popup_left')
    positionPopUp('myicon58-4','popup_left')
    positionPopUp('myicon58-5','popup_left')
    positionPopUp('myicon58-6','popup_left')
    positionPopUp('myicon58-7','popup_left')
    positionPopUp('myicon58-8','popup_left')
    positionPopUp('myicon58-9','popup_left')
    positionPopUp('myicon58-10','popup_left')
    positionPopUp('myicon58-11','popup_left')
    positionPopUp('myicon58-12','popup_left')
    positionPopUp('myicon58-13','popup_left')
    positionPopUp('myicon58-14','popup_left')
    positionPopUp('myicon58-15','popup_left')

    //row59
    positionPopUp('myicon59-0','popup_left')
    positionPopUp('myicon59-1','popup_left')
    positionPopUp('myicon59-2','popup_left')
    positionPopUp('myicon59-3','popup_left')
    positionPopUp('myicon59-4','popup_left')
    positionPopUp('myicon59-5','popup_left')
    positionPopUp('myicon59-6','popup_left')
    positionPopUp('myicon59-7','popup_left')
    positionPopUp('myicon59-8','popup_left')

    //row60
    positionPopUp('myicon60-0','popup_left')
    positionPopUp('myicon60-1','popup_left')
    positionPopUp('myicon60-2','popup_left')
    positionPopUp('myicon60-3','popup_left')
    positionPopUp('myicon60-4','popup_left')
    positionPopUp('myicon60-5','popup_left')
    positionPopUp('myicon60-6','popup_left')
    positionPopUp('myicon60-7','popup_left')
    positionPopUp('myicon60-8','popup_left')

     //row61
    positionPopUp('myicon61-0','popup_left')
    positionPopUp('myicon61-1','popup_left')
    positionPopUp('myicon61-2','popup_left')

     //row62
    positionPopUp('myicon62-0','popup_left')
    positionPopUp('myicon62-1','popup_left')
    positionPopUp('myicon62-2','popup_left')
    positionPopUp('myicon62-3','popup_left')
    positionPopUp('myicon62-4','popup_left')
    positionPopUp('myicon62-5','popup_left')
    positionPopUp('myicon62-6','popup_left')
    positionPopUp('myicon62-7','popup_left')
    positionPopUp('myicon62-8','popup_left')
    positionPopUp('myicon62-9','popup_left')
    positionPopUp('myicon62-10','popup_left')
    positionPopUp('myicon62-11','popup_left')
    positionPopUp('myicon62-12','popup_left')
    positionPopUp('myicon62-13','popup_left')

     //row63
    positionPopUp('myicon63-0','popup_left')
    positionPopUp('myicon63-1','popup_left')
    positionPopUp('myicon63-2','popup_left')
    positionPopUp('myicon63-3','popup_left')
    positionPopUp('myicon63-4','popup_left')
    positionPopUp('myicon63-5','popup_left')
    positionPopUp('myicon63-6','popup_left')
    positionPopUp('myicon63-7','popup_left')
    positionPopUp('myicon63-8','popup_left')
    positionPopUp('myicon63-9','popup_left')
    positionPopUp('myicon63-10','popup_left')
    positionPopUp('myicon63-11','popup_left')
    positionPopUp('myicon63-12','popup_left')
    positionPopUp('myicon63-13','popup_left')
    positionPopUp('myicon63-14','popup_left')
    positionPopUp('myicon63-15','popup_left')
    positionPopUp('myicon63-16','popup_left')

     //row64
    positionPopUp('myicon64-0','popup_left')
    positionPopUp('myicon64-1','popup_left')
    positionPopUp('myicon64-2','popup_left')
    positionPopUp('myicon64-3','popup_left')
    positionPopUp('myicon64-4','popup_left')
    positionPopUp('myicon64-5','popup_left')
    positionPopUp('myicon64-6','popup_left')
    positionPopUp('myicon64-7','popup_left')
    positionPopUp('myicon64-8','popup_left')
    positionPopUp('myicon64-9','popup_left')
    positionPopUp('myicon64-10','popup_left')
    positionPopUp('myicon64-11','popup_left')

     //row65
    positionPopUp('myicon65-0','popup_left')
    positionPopUp('myicon65-1','popup_left')
    positionPopUp('myicon65-2','popup_left')
    positionPopUp('myicon65-3','popup_left')
    positionPopUp('myicon65-4','popup_left')
    positionPopUp('myicon65-5','popup_left')
    positionPopUp('myicon65-6','popup_left')
    positionPopUp('myicon65-7','popup_left')
    positionPopUp('myicon65-8','popup_left')
    positionPopUp('myicon65-9','popup_left')
    positionPopUp('myicon65-10','popup_left')
    positionPopUp('myicon65-11','popup_left')
    positionPopUp('myicon65-12','popup_left')
    positionPopUp('myicon65-13','popup_left')
    positionPopUp('myicon65-14','popup_left')

     //row66
    positionPopUp('myicon66-0','popup_left')
    positionPopUp('myicon66-1','popup_left')
    positionPopUp('myicon66-2','popup_left')
    positionPopUp('myicon66-3','popup_left')
    positionPopUp('myicon66-4','popup_left')
    positionPopUp('myicon66-5','popup_left')
    positionPopUp('myicon66-6','popup_left')
    positionPopUp('myicon66-7','popup_left')
    positionPopUp('myicon66-8','popup_left')
    positionPopUp('myicon66-9','popup_left')
    positionPopUp('myicon66-10','popup_left')
    positionPopUp('myicon66-11','popup_left')
    positionPopUp('myicon66-12','popup_left')

     //row67
    positionPopUp('myicon67-0','popup_left')
    positionPopUp('myicon67-1','popup_left')
    positionPopUp('myicon67-2','popup_left')
    positionPopUp('myicon67-3','popup_left')
    positionPopUp('myicon67-4','popup_left')
    positionPopUp('myicon67-5','popup_left')
    positionPopUp('myicon67-6','popup_left')
    positionPopUp('myicon67-7','popup_left')

     //row68
    positionPopUp('myicon68-0','popup_left')
    positionPopUp('myicon68-1','popup_left')
    positionPopUp('myicon68-2','popup_left')
    positionPopUp('myicon68-3','popup_left')
    positionPopUp('myicon68-4','popup_left')
    positionPopUp('myicon68-5','popup_left')
    positionPopUp('myicon68-6','popup_left')
    positionPopUp('myicon68-7','popup_left')
    positionPopUp('myicon68-8','popup_left')
    positionPopUp('myicon68-9','popup_left')
    positionPopUp('myicon68-10','popup_left')

     //row70
    positionPopUp('myicon70-0','popup_left')
    positionPopUp('myicon70-1','popup_left')
    positionPopUp('myicon70-2','popup_left')
    positionPopUp('myicon70-3','popup_left')
    positionPopUp('myicon70-4','popup_left')
    positionPopUp('myicon70-5','popup_left')
    positionPopUp('myicon70-6','popup_left')

     //row70
    positionPopUp('myicon71-0','popup_left')
    positionPopUp('myicon71-1','popup_left')
    positionPopUp('myicon71-2','popup_left')
    positionPopUp('myicon71-3','popup_left')
    positionPopUp('myicon71-4','popup_left')
    positionPopUp('myicon71-5','popup_left')
    positionPopUp('myicon71-6','popup_left')
    positionPopUp('myicon71-7','popup_left')
    positionPopUp('myicon71-8','popup_left')

    //row71
    positionPopUp('myicon72-0','popup_left')
    positionPopUp('myicon72-1','popup_left')
    positionPopUp('myicon72-2','popup_left')
    positionPopUp('myicon72-3','popup_left')
    positionPopUp('myicon72-4','popup_left')
    positionPopUp('myicon72-5','popup_left')
    positionPopUp('myicon72-6','popup_left')
    positionPopUp('myicon72-7','popup_left')
    positionPopUp('myicon72-8','popup_left')
    positionPopUp('myicon72-9','popup_left')
    positionPopUp('myicon72-10','popup_left')
    positionPopUp('myicon72-11','popup_left')
    positionPopUp('myicon72-12','popup_left')
    positionPopUp('myicon72-13','popup_left')
    positionPopUp('myicon72-14','popup_left')
    positionPopUp('myicon72-15','popup_left')
    positionPopUp('myicon72-16','popup_left')
    positionPopUp('myicon72-17','popup_left')

    //row72
    positionPopUp('myicon73-0','popup_left')
    positionPopUp('myicon73-1','popup_left')
    positionPopUp('myicon73-2','popup_left')
    positionPopUp('myicon73-3','popup_left')
    positionPopUp('myicon73-4','popup_left')
    positionPopUp('myicon73-5','popup_left')
    positionPopUp('myicon73-6','popup_left')
    positionPopUp('myicon73-7','popup_left')
    positionPopUp('myicon73-8','popup_left')
    positionPopUp('myicon73-9','popup_left')

    //row73
    positionPopUp('myicon74-0','popup_left')
    positionPopUp('myicon74-1','popup_left')
    positionPopUp('myicon74-2','popup_left')

    //row74
    positionPopUp('myicon75-0','popup_left')
    positionPopUp('myicon75-1','popup_left')
    positionPopUp('myicon75-2','popup_left')
    positionPopUp('myicon75-3','popup_left')
    positionPopUp('myicon75-4','popup_left')
    positionPopUp('myicon75-5','popup_left')
    positionPopUp('myicon75-6','popup_left')
    positionPopUp('myicon75-7','popup_left')
    positionPopUp('myicon75-8','popup_left')
    positionPopUp('myicon75-9','popup_left')
    positionPopUp('myicon75-10','popup_left')
    positionPopUp('myicon75-11','popup_left')
    positionPopUp('myicon75-12','popup_left')

    //row74
    positionPopUp('myicon76-0','popup_left')
    positionPopUp('myicon76-1','popup_left')
    positionPopUp('myicon76-2','popup_left')
    positionPopUp('myicon76-3','popup_left')
    
    //row75
    positionPopUp('myicon77-0','popup_left')
    positionPopUp('myicon77-1','popup_left')
    positionPopUp('myicon77-2','popup_left')
    positionPopUp('myicon77-3','popup_left')
    positionPopUp('myicon77-4','popup_left')
    positionPopUp('myicon77-5','popup_left')

    //row77
    positionPopUp('myicon78-0','popup_left')
    positionPopUp('myicon78-1','popup_left')
    positionPopUp('myicon78-2','popup_left')
    positionPopUp('myicon78-3','popup_left')
    positionPopUp('myicon78-4','popup_left')
    positionPopUp('myicon78-5','popup_left')

     //row78
     positionPopUp('myicon79-0','popup_left')
     positionPopUp('myicon79-1','popup_left')
     positionPopUp('myicon79-2','popup_left')
     positionPopUp('myicon79-3','popup_left')
     positionPopUp('myicon79-4','popup_left')

     //row80
     positionPopUp('myicon80-0','popup_left')
     positionPopUp('myicon80-1','popup_left')
     positionPopUp('myicon80-2','popup_left')
     positionPopUp('myicon80-3','popup_left')
     positionPopUp('myicon80-4','popup_left')

     //row81
     positionPopUp('myicon81-0','popup_left')
     positionPopUp('myicon81-1','popup_left')
     positionPopUp('myicon81-2','popup_left')
     positionPopUp('myicon81-3','popup_left')
     positionPopUp('myicon81-4','popup_left')
     positionPopUp('myicon81-5','popup_left')
     positionPopUp('myicon81-6','popup_left')
     positionPopUp('myicon81-7','popup_left')

/////popup_down
switch(num){
    case 'st51 st52 st53 text1':
    info1 = foodInfo[0].giLevel
    info2 = foodInfo[0].color
    info3 = foodInfo[0].category
    info4 = foodInfo[0].amount
    info5 = foodInfo[0].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text2':
    info1 = foodInfo[1].giLevel
    info2 = foodInfo[1].color
    info3 = foodInfo[1].category
    info4 = foodInfo[1].amount
    info5 = foodInfo[1].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text3':
    info1 = foodInfo[2].giLevel
    info2 = foodInfo[2].color
    info3 = foodInfo[2].category
    info4 = foodInfo[2].amount
    info5 = foodInfo[2].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text4':
    info1 = foodInfo[3].giLevel
    info2 = foodInfo[3].color
    info3 = foodInfo[3].category
    info4 = foodInfo[3].amount
    info5 = foodInfo[3].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text5':
    info1 = foodInfo[4].giLevel
    info2 = foodInfo[4].color
    info3 = foodInfo[4].category
    info4 = foodInfo[4].amount
    info5 = foodInfo[4].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text6':
    info1 = foodInfo[5].giLevel
    info2 = foodInfo[5].color
    info3 = foodInfo[5].category
    info4 = foodInfo[5].amount
    info5 = foodInfo[5].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text7':
    info1 = foodInfo[6].giLevel
    info2 = foodInfo[6].color
    info3 = foodInfo[6].category
    info4 = foodInfo[6].amount
    info5 = foodInfo[6].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text8':
    info1 = foodInfo[7].giLevel
    info2 = foodInfo[7].color
    info3 = foodInfo[7].category
    info4 = foodInfo[7].amount
    info5 = foodInfo[7].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text9':
    info1 = foodInfo[8].giLevel
    info2 = foodInfo[8].color
    info3 = foodInfo[8].category
    info4 = foodInfo[8].amount
    info5 = foodInfo[8].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text10':
    info1 = foodInfo[9].giLevel
    info2 = foodInfo[9].color
    info3 = foodInfo[9].category
    info4 = foodInfo[9].amount
    info5 = foodInfo[9].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text11':
    info1 = foodInfo[10].giLevel
    info2 = foodInfo[10].color
    info3 = foodInfo[10].category
    info4 = foodInfo[10].amount
    info5 = foodInfo[10].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text12':
    info1 = foodInfo[11].giLevel
    info2 = foodInfo[11].color
    info3 = foodInfo[11].category
    info4 = foodInfo[11].amount
    info5 = foodInfo[11].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text13':
    info1 = foodInfo[12].giLevel
    info2 = foodInfo[12].color
    info3 = foodInfo[12].category
    info4 = foodInfo[12].amount
    info5 = foodInfo[12].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text14':
    info1 = foodInfo[13].giLevel
    info2 = foodInfo[13].color
    info3 = foodInfo[13].category
    info4 = foodInfo[13].amount
    info5 = foodInfo[13].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text15':
    info1 = foodInfo[14].giLevel
    info2 = foodInfo[14].color
    info3 = foodInfo[14].category
    info4 = foodInfo[14].amount
    info5 = foodInfo[14].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text16':
    info1 = foodInfo[15].giLevel
    info2 = foodInfo[15].color
    info3 = foodInfo[15].category
    info4 = foodInfo[15].amount
    info5 = foodInfo[15].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text17':
    info1 = foodInfo[16].giLevel
    info2 = foodInfo[16].color
    info3 = foodInfo[16].category
    info4 = foodInfo[16].amount
    info5 = foodInfo[16].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text18':
    info1 = foodInfo[17].giLevel
    info2 = foodInfo[17].color
    info3 = foodInfo[17].category
    info4 = foodInfo[17].amount
    info5 = foodInfo[17].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text19':
    info1 = foodInfo[18].giLevel
    info2 = foodInfo[18].color
    info3 = foodInfo[18].category
    info4 = foodInfo[18].amount
    info5 = foodInfo[18].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text20':
    info1 = foodInfo[19].giLevel
    info2 = foodInfo[19].color
    info3 = foodInfo[19].category
    info4 = foodInfo[19].amount
    info5 = foodInfo[19].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text21':
    info1 = foodInfo[20].giLevel
    info2 = foodInfo[20].color
    info3 = foodInfo[20].category
    info4 = foodInfo[20].amount
    info5 = foodInfo[20].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text22':
    info1 = foodInfo[21].giLevel
    info2 = foodInfo[21].color
    info3 = foodInfo[21].category
    info4 = foodInfo[21].amount
    info5 = foodInfo[21].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text23':
    info1 = foodInfo[22].giLevel
    info2 = foodInfo[22].color
    info3 = foodInfo[22].category
    info4 = foodInfo[22].amount
    info5 = foodInfo[22].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text24':
    info1 = foodInfo[23].giLevel
    info2 = foodInfo[23].color
    info3 = foodInfo[23].category
    info4 = foodInfo[23].amount
    info5 = foodInfo[23].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text25':
    info1 = foodInfo[24].giLevel
    info2 = foodInfo[24].color
    info3 = foodInfo[24].category
    info4 = foodInfo[24].amount
    info5 = foodInfo[24].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text26':
    info1 = foodInfo[25].giLevel
    info2 = foodInfo[25].color
    info3 = foodInfo[25].category
    info4 = foodInfo[25].amount
    info5 = foodInfo[25].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text27':
    info1 = foodInfo[26].giLevel
    info2 = foodInfo[26].color
    info3 = foodInfo[26].category
    info4 = foodInfo[26].amount
    info5 = foodInfo[26].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text28':
    info1 = foodInfo[27].giLevel
    info2 = foodInfo[27].color
    info3 = foodInfo[27].category
    info4 = foodInfo[27].amount
    info5 = foodInfo[27].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text29':
    info1 = foodInfo[28].giLevel
    info2 = foodInfo[28].color
    info3 = foodInfo[28].category
    info4 = foodInfo[28].amount
    info5 = foodInfo[28].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text30':
    info1 = foodInfo[29].giLevel
    info2 = foodInfo[29].color
    info3 = foodInfo[29].category
    info4 = foodInfo[29].amount
    info5 = foodInfo[29].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text31':
    info1 = foodInfo[30].giLevel
    info2 = foodInfo[30].color
    info3 = foodInfo[30].category
    info4 = foodInfo[30].amount
    info5 = foodInfo[30].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text32':
    info1 = foodInfo[31].giLevel
    info2 = foodInfo[31].color
    info3 = foodInfo[31].category
    info4 = foodInfo[31].amount
    info5 = foodInfo[31].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text33':
    info1 = foodInfo[32].giLevel
    info2 = foodInfo[32].color
    info3 = foodInfo[32].category
    info4 = foodInfo[32].amount
    info5 = foodInfo[32].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text34':
    info1 = foodInfo[33].giLevel
    info2 = foodInfo[33].color
    info3 = foodInfo[33].category
    info4 = foodInfo[33].amount
    info5 = foodInfo[33].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text35':
    info1 = foodInfo[34].giLevel
    info2 = foodInfo[34].color
    info3 = foodInfo[34].category
    info4 = foodInfo[34].amount
    info5 = foodInfo[34].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text36':
    info1 = foodInfo[35].giLevel
    info2 = foodInfo[35].color
    info3 = foodInfo[35].category
    info4 = foodInfo[35].amount
    info5 = foodInfo[35].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text37':
    info1 = foodInfo[36].giLevel
    info2 = foodInfo[36].color
    info3 = foodInfo[36].category
    info4 = foodInfo[36].amount
    info5 = foodInfo[36].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text38':
    info1 = foodInfo[37].giLevel
    info2 = foodInfo[37].color
    info3 = foodInfo[37].category
    info4 = foodInfo[37].amount
    info5 = foodInfo[37].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text39':
    info1 = foodInfo[38].giLevel
    info2 = foodInfo[38].color
    info3 = foodInfo[38].category
    info4 = foodInfo[38].amount
    info5 = foodInfo[38].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text40':
    info1 = foodInfo[39].giLevel
    info2 = foodInfo[39].color
    info3 = foodInfo[39].category
    info4 = foodInfo[39].amount
    info5 = foodInfo[39].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text41':
    info1 = foodInfo[40].giLevel
    info2 = foodInfo[40].color
    info3 = foodInfo[40].category
    info4 = foodInfo[40].amount
    info5 = foodInfo[40].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text42':
    info1 = foodInfo[41].giLevel
    info2 = foodInfo[41].color
    info3 = foodInfo[41].category
    info4 = foodInfo[41].amount
    info5 = foodInfo[41].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text43':
    info1 = foodInfo[42].giLevel
    info2 = foodInfo[42].color
    info3 = foodInfo[42].category
    info4 = foodInfo[42].amount
    info5 = foodInfo[42].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text44':
    info1 = foodInfo[43].giLevel
    info2 = foodInfo[43].color
    info3 = foodInfo[43].category
    info4 = foodInfo[43].amount
    info5 = foodInfo[43].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text45':
    info1 = foodInfo[44].giLevel
    info2 = foodInfo[44].color
    info3 = foodInfo[44].category
    info4 = foodInfo[44].amount
    info5 = foodInfo[44].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text46':
    info1 = foodInfo[45].giLevel
    info2 = foodInfo[45].color
    info3 = foodInfo[45].category
    info4 = foodInfo[45].amount
    info5 = foodInfo[45].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text47':
    info1 = foodInfo[46].giLevel
    info2 = foodInfo[46].color
    info3 = foodInfo[46].category
    info4 = foodInfo[46].amount
    info5 = foodInfo[46].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text48':
    info1 = foodInfo[47].giLevel
    info2 = foodInfo[47].color
    info3 = foodInfo[47].category
    info4 = foodInfo[47].amount
    info5 = foodInfo[47].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text49':
    info1 = foodInfo[48].giLevel
    info2 = foodInfo[48].color
    info3 = foodInfo[48].category
    info4 = foodInfo[48].amount
    info5 = foodInfo[48].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text50':
    info1 = foodInfo[49].giLevel
    info2 = foodInfo[49].color
    info3 = foodInfo[49].category
    info4 = foodInfo[49].amount
    info5 = foodInfo[49].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text51':
    info1 = foodInfo[50].giLevel
    info2 = foodInfo[50].color
    info3 = foodInfo[50].category
    info4 = foodInfo[50].amount
    info5 = foodInfo[50].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text52':
    info1 = foodInfo[51].giLevel
    info2 = foodInfo[51].color
    info3 = foodInfo[51].category
    info4 = foodInfo[51].amount
    info5 = foodInfo[51].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text53':
    info1 = foodInfo[52].giLevel
    info2 = foodInfo[52].color
    info3 = foodInfo[52].category
    info4 = foodInfo[52].amount
    info5 = foodInfo[52].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text54':
    info1 = foodInfo[53].giLevel
    info2 = foodInfo[53].color
    info3 = foodInfo[53].category
    info4 = foodInfo[53].amount
    info5 = foodInfo[53].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text55':
    info1 = foodInfo[54].giLevel
    info2 = foodInfo[54].color
    info3 = foodInfo[54].category
    info4 = foodInfo[54].amount
    info5 = foodInfo[54].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text56':
    info1 = foodInfo[55].giLevel
    info2 = foodInfo[55].color
    info3 = foodInfo[55].category
    info4 = foodInfo[55].amount
    info5 = foodInfo[55].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text57':
    info1 = foodInfo[56].giLevel
    info2 = foodInfo[56].color
    info3 = foodInfo[56].category
    info4 = foodInfo[56].amount
    info5 = foodInfo[56].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text58':
    info1 = foodInfo[57].giLevel
    info2 = foodInfo[57].color
    info3 = foodInfo[57].category
    info4 = foodInfo[57].amount
    info5 = foodInfo[57].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text59':
    info1 = foodInfo[58].giLevel
    info2 = foodInfo[58].color
    info3 = foodInfo[58].category
    info4 = foodInfo[58].amount
    info5 = foodInfo[58].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text60':
    info1 = foodInfo[59].giLevel
    info2 = foodInfo[59].color
    info3 = foodInfo[59].category
    info4 = foodInfo[59].amount
    info5 = foodInfo[59].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text61':
    info1 = foodInfo[60].giLevel
    info2 = foodInfo[60].color
    info3 = foodInfo[60].category
    info4 = foodInfo[60].amount
    info5 = foodInfo[60].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text62':
    info1 = foodInfo[61].giLevel
    info2 = foodInfo[61].color
    info3 = foodInfo[61].category
    info4 = foodInfo[61].amount
    info5 = foodInfo[61].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text63':
    info1 = foodInfo[62].giLevel
    info2 = foodInfo[62].color
    info3 = foodInfo[62].category
    info4 = foodInfo[62].amount
    info5 = foodInfo[62].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text64':
    info1 = foodInfo[63].giLevel
    info2 = foodInfo[63].color
    info3 = foodInfo[63].category
    info4 = foodInfo[63].amount
    info5 = foodInfo[63].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text65':
    info1 = foodInfo[64].giLevel
    info2 = foodInfo[64].color
    info3 = foodInfo[64].category
    info4 = foodInfo[64].amount
    info5 = foodInfo[64].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text66':
    info1 = foodInfo[65].giLevel
    info2 = foodInfo[65].color
    info3 = foodInfo[65].category
    info4 = foodInfo[65].amount
    info5 = foodInfo[65].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text67':
    info1 = foodInfo[66].giLevel
    info2 = foodInfo[66].color
    info3 = foodInfo[66].category
    info4 = foodInfo[66].amount
    info5 = foodInfo[66].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text68':
    info1 = foodInfo[67].giLevel
    info2 = foodInfo[67].color
    info3 = foodInfo[67].category
    info4 = foodInfo[67].amount
    info5 = foodInfo[67].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text69':
    info1 = foodInfo[68].giLevel
    info2 = foodInfo[68].color
    info3 = foodInfo[68].category
    info4 = foodInfo[68].amount
    info5 = foodInfo[68].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text70':
    info1 = foodInfo[69].giLevel
    info2 = foodInfo[69].color
    info3 = foodInfo[69].category
    info4 = foodInfo[69].amount
    info5 = foodInfo[69].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text71':
    info1 = foodInfo[70].giLevel
    info2 = foodInfo[70].color
    info3 = foodInfo[70].category
    info4 = foodInfo[70].amount
    info5 = foodInfo[70].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text72':
    info1 = foodInfo[71].giLevel
    info2 = foodInfo[71].color
    info3 = foodInfo[71].category
    info4 = foodInfo[71].amount
    info5 = foodInfo[71].url
    changeText2(info1,info2,info3,info4,info5)
    break;
    
    case 'st51 st52 st53 text73':
    info1 = foodInfo[72].giLevel
    info2 = foodInfo[72].color
    info3 = foodInfo[72].category
    info4 = foodInfo[72].amount
    info5 = foodInfo[72].url
    changeText2(info1,info2,info3,info4,info5)
    break;
     
    case 'st51 st52 st53 text74':
    info1 = foodInfo[73].giLevel
    info2 = foodInfo[73].color
    info3 = foodInfo[73].category
    info4 = foodInfo[73].amount
    info5 = foodInfo[73].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text75':
    info1 = foodInfo[74].giLevel
    info2 = foodInfo[74].color
    info3 = foodInfo[74].category
    info4 = foodInfo[74].amount
    info5 = foodInfo[74].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text76':
    info1 = foodInfo[75].giLevel
    info2 = foodInfo[75].color
    info3 = foodInfo[75].category
    info4 = foodInfo[75].amount
    info5 = foodInfo[75].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text77':
    info1 = foodInfo[76].giLevel
    info2 = foodInfo[76].color
    info3 = foodInfo[76].category
    info4 = foodInfo[76].amount
    info5 = foodInfo[76].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text78':
    info1 = foodInfo[77].giLevel
    info2 = foodInfo[77].color
    info3 = foodInfo[77].category
    info4 = foodInfo[77].amount
    info5 = foodInfo[77].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text79':
    info1 = foodInfo[78].giLevel
    info2 = foodInfo[78].color
    info3 = foodInfo[78].category
    info4 = foodInfo[78].amount
    info5 = foodInfo[78].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text80':
    info1 = foodInfo[79].giLevel
    info2 = foodInfo[79].color
    info3 = foodInfo[79].category
    info4 = foodInfo[79].amount
    info5 = foodInfo[79].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text81':
    info1 = foodInfo[80].giLevel
    info2 = foodInfo[80].color
    info3 = foodInfo[80].category
    info4 = foodInfo[80].amount
    info5 = foodInfo[80].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text82':
    info1 = foodInfo[81].giLevel
    info2 = foodInfo[81].color
    info3 = foodInfo[81].category
    info4 = foodInfo[81].amount
    info5 = foodInfo[81].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text83':
    info1 = foodInfo[82].giLevel
    info2 = foodInfo[82].color
    info3 = foodInfo[82].category
    info4 = foodInfo[82].amount
    info5 = foodInfo[82].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text84':
    info1 = foodInfo[83].giLevel
    info2 = foodInfo[83].color
    info3 = foodInfo[83].category
    info4 = foodInfo[83].amount
    info5 = foodInfo[83].url
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text85':
    info1 = foodInfo[84].giLevel
    info2 = foodInfo[84].color
    info3 = foodInfo[84].category
    info4 = foodInfo[84].amount
    info5 = foodInfo[84].url
    changeText2(info1,info2,info3,info4,info5)
    break;



}



positionPopUp('myfood','popup_down');
positionPopUp('myfood2','popup_down');
positionPopUp('myfood3','popup_down');
positionPopUp('myfood4','popup_down');
positionPopUp('myfood5','popup_down');
positionPopUp('myfood6','popup_down');
positionPopUp('myfood7','popup_down');
positionPopUp('myfood8','popup_down');
positionPopUp('myfood9','popup_down');
positionPopUp('myfood10','popup_down');

positionPopUp('myfood11','popup_down');
positionPopUp('myfood12','popup_down');
positionPopUp('myfood13','popup_down');
positionPopUp('myfood14','popup_down');
positionPopUp('myfood15','popup_down');
positionPopUp('myfood16','popup_down');
positionPopUp('myfood17','popup_down');
positionPopUp('myfood18','popup_down');
positionPopUp('myfood19','popup_down');
positionPopUp('myfood20','popup_down');

positionPopUp('myfood21','popup_down');
positionPopUp('myfood22','popup_down');
positionPopUp('myfood23','popup_down');
positionPopUp('myfood24','popup_down');
positionPopUp('myfood25','popup_down');
positionPopUp('myfood26','popup_down');
positionPopUp('myfood27','popup_down');
positionPopUp('myfood28','popup_down');
positionPopUp('myfood29','popup_down');
positionPopUp('myfood30','popup_down');

positionPopUp('myfood31','popup_down');
positionPopUp('myfood32','popup_down');
positionPopUp('myfood33','popup_down');
positionPopUp('myfood34','popup_down');
positionPopUp('myfood35','popup_down');
positionPopUp('myfood36','popup_down');
positionPopUp('myfood37','popup_down');
positionPopUp('myfood38','popup_down');
positionPopUp('myfood39','popup_down');
positionPopUp('myfood40','popup_down');

positionPopUp('myfood41','popup_down');
positionPopUp('myfood42','popup_down');
positionPopUp('myfood43','popup_down');
positionPopUp('myfood44','popup_down');
positionPopUp('myfood45','popup_down');
positionPopUp('myfood46','popup_down');
positionPopUp('myfood47','popup_down');
positionPopUp('myfood48','popup_down');
positionPopUp('myfood49','popup_down');
positionPopUp('myfood50','popup_down');

positionPopUp('myfood51','popup_down');
positionPopUp('myfood52','popup_down');
positionPopUp('myfood53','popup_down');
positionPopUp('myfood54','popup_down');
positionPopUp('myfood55','popup_down');
positionPopUp('myfood56','popup_down');
positionPopUp('myfood57','popup_down');
positionPopUp('myfood58','popup_down');
positionPopUp('myfood59','popup_down');
positionPopUp('myfood60','popup_down');

positionPopUp('myfood61','popup_down');
positionPopUp('myfood62','popup_down');
positionPopUp('myfood63','popup_down');
positionPopUp('myfood64','popup_down');
positionPopUp('myfood65','popup_down');
positionPopUp('myfood66','popup_down');
positionPopUp('myfood67','popup_down');
positionPopUp('myfood68','popup_down');
positionPopUp('myfood69','popup_down');
positionPopUp('myfood70','popup_down');

positionPopUp('myfood71','popup_down');
positionPopUp('myfood72','popup_down');
positionPopUp('myfood73','popup_down');
positionPopUp('myfood74','popup_down');
positionPopUp('myfood75','popup_down');
positionPopUp('myfood76','popup_down');
positionPopUp('myfood77','popup_down');
positionPopUp('myfood78','popup_down');
positionPopUp('myfood79','popup_down');
positionPopUp('myfood80','popup_down');

positionPopUp('myfood81','popup_down');
positionPopUp('myfood82','popup_down');
positionPopUp('myfood83','popup_down');
positionPopUp('myfood84','popup_down');
positionPopUp('myfood85','popup_down');


}
}else{
    console.log('no data found')
}
//pop2 内容全部改成0； 设置好其他的id，通过innerHTML改内容；加上：GI level（最前面）和对哪个身体部分好；
// 背景通过style.css改
//xhtml从外部引入json文件
//原图,按感觉规









