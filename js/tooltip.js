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
            currentPop.style.top = (window.scrollY + iconPos.top + 24) + "px";
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
















// positionPopUp('myfood','popup_down');
}
}else{
    console.log('no data found')
}
//pop2 内容全部改成0； 设置好其他的id，通过innerHTML改内容；加上：GI level（最前面）和对哪个身体部分好；
// 背景通过style.css改
//xhtml从外部引入json文件
//原图,按感觉规









