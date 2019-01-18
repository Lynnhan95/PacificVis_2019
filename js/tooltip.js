//create DOM element
function tag(tagName){
    return document.createElement(tagName);
}

//create popup_down, enter div's id via para1 and nutrition name, nutrition percent via para2 and para3 respectively
function createPopUp1(entID, nutriName, nutriPercent){
    var div = tag('div');
    div.id = entID
    var title = tag('h2');
    title.textContent = nutriName;
    div.appendChild(title);
    var content = tag('p');
    content.textContent = nutriPercent;
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
function createPopUp2(entID, imgUrl){
    var div = tag('div');
    div.id = entID;
    var divImg = tag('div');
    divImg.className = 'divImg';
    divImg.style.background = imgUrl;
    console.log(divImg);
    div.appendChild(divImg);

    var title = tag('h3');
    title.textContent = 'COLOR';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = 'Brown';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    
    var title = tag('h3');
    title.textContent = 'CATEGORY';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = 'Legumes';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    console.log(div);

    var title = tag('h3');
    title.textContent = 'AMOUNT PER DAY';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = '1 oz';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    console.log(div);

    return div;
}

//draw ring chart, and set svg's id via entId
function drawRingchart(entId){
    var dataset = {
    inner: [50, 24, 16, 5, 2, 3],
    outer: [9,91],
    };
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

    var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g");
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
        var iconPos = myicon.getBoundingClientRect();
        if(whichpop == 'popup_left'){
            currentPop.style.left = (iconPos.right + 20) + "px";
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
        currentPop.style.display = "none";
    }
    myicon.addEventListener("mouseover", showPopup);
    myicon.addEventListener("mouseout", hidePopup);
}

//final popup_left operation
function enterCont(nutriName,nutriPercent){
    var pop1 = createPopUp1('popup_left', nutriName,nutriPercent);
    document.body.appendChild(pop1);
    var ring = drawRingchart('ringchart');
}
var nutriCont = [
    {'name':'total fat231','percentage':'8%'},
    {'name':'Protein','percentage':'65%'}
]
//监听全局点击事件
document.onmouseover = function(eee){
    console.log(eee.target.className.baseVal);
}
// console.log(nutriCont[0].percentage)
enterCont(nutriCont[0].name,nutriCont[0].percentage)    


positionPopUp("myicon",'popup_left');
positionPopUp("myicon2",'popup_left');




var pop2 = createPopUp2('popup_down',"#000 url('images/walnut2.jpg') no-repeat");
document.body.appendChild(pop2);
positionPopUp('myfood','popup_down');




