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












// positionPopUp('myfood','popup_down');
}
}else{
    console.log('no data found')
}
//pop2 内容全部改成0； 设置好其他的id，通过innerHTML改内容；加上：GI level（最前面）和对哪个身体部分好；
// 背景通过style.css改
//xhtml从外部引入json文件
//原图,按感觉规









