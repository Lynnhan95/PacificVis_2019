var foodInfo = [
    {'giLevel':'Low','color':'Brown','category':'Legumes','amount':'1oz','url':"background: #000 url('images/walnut2.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'Legumes','amount':'1oz','url':"background: #000 url('images/cashew.jpg') no-repeat"},
    {'giLevel':'Low','color':'Brown','category':'Legumes','amount':'1oz','url':"background: #000 url('images/pea.jpg') no-repeat"},
    {'giLevel':'Low','color':'white','category':'Vegetables','amount':'1oz','url':"background: #000 url('images/mush.jpg') no-repeat"},
    {'giLevel':'Low','color':'Black','category':'Tea','amount':'1 cup','url':"background: #000 url('images/cof.jpg') no-repeat"},

    {'giLevel':'Low','color':'Blue','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/blu.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/bro.jpg') no-repeat"},
    {'giLevel':'Low','color':'Orange','category':'Legumes','amount':'1oz','url':"background: #000 url('images/seed.jpg') no-repeat"},
    {'giLevel':'Low','color':'Orange','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/ora.jpg') no-repeat"},
    {'giLevel':'Low','color':'Brown','category':'Legumes','amount':'1oz','url':"background: #000 url('images/len.jpg') no-repeat"},

    {'giLevel':'Low','color':'Orange','category':'Fruits','amount':'1oz','url':"background: #000 url('images/grap.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Legumes','amount':'1 cup','url':"background: #000 url('images/spi.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/kal.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/colla.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/calli.jpg') no-repeat"},

    {'giLevel':'Low','color':'Orange','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/sweet.jpg') no-repeat"},
    {'giLevel':'Low','color':'Pink','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/tuna.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/sard.jpg') no-repeat"},
    {'giLevel':'Low','color':'Pink','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/tro.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/mak.jpg') no-repeat"},

    {'giLevel':'Low','color':'White','category':'Seafoods','amount':'1oz','url':"background: #000 url('images/anc.jpg') no-repeat"},
    {'giLevel':'Low','color':'Purple','category':'Vegetables','amount':'3oz','url':"background: #000 url('images/bef.jpg') no-repeat"},
    {'giLevel':'Low','color':'Black','category':'Legumes','amount':'1oz','url':"background: #000 url('images/chia.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/lem.jpg') no-repeat"},
    {'giLevel':'High','color':'Orange','category':'Fruits','amount':'1oz','url':"background: #000 url('images/pumk.jpg') no-repeat"},

    {'giLevel':'Low','color':'Green','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/kiwi.jpg') no-repeat"},
    {'giLevel':'High','color':'Yellow','category':'Vegetable','amount':'1 cup','url':"background: #000 url('images/pota.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Oils','amount':'1tbsp','url':"background: #000 url('images/coco.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'Diart','amount':'1tbsp','url':"background: #000 url('images/butter.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'','amount':'1tbsp','url':"background: #000 url('images/honey.jpg') no-repeat"},

    {'giLevel':'Low','color':'Green','category':'Oils','amount':'1tbsp','url':"background: #000 url('images/oli.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Oils','amount':'1tbsp','url':"background: #000 url('images/grapo.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'Legumes','amount':'1tbsp','url':"background: #000 url('images/tume.jpg') no-repeat"},
    {'giLevel':'Medium','color':'Orange','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/papa.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','Diary':'Legumes','amount':'1 cup','url':"background: #000 url('images/yogu.jpg') no-repeat"},

    {'giLevel':'Low','color':'Yellow','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/bana.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/cucu.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/straw.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/gb.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/b.jpg') no-repeat"},

    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/arti.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'Vegetables','amount':'1tbsp','url':"background: #000 url('images/ginger.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'','amount':'1 cup','url':"background: #000 url('images/kim.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/toma.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/avo.jpg') no-repeat"},

    {'giLevel':'Low','color':'Orange','category':'Vegetable','amount':'1 cup','url':"background: #000 url('images/caro.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Tea','amount':'1 cup','url':"background: #000 url('images/gt.jpg') no-repeat"},
    {'giLevel':'High','color':'Pink','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/wat.jpg') no-repeat"},
    {'giLevel':'Medium','color':'Red','category':'','amount':'1 cup','url':"background: #000 url('images/pom.jpg') no-repeat"},
    {'giLevel':'Low','color':'Purple','category':'','amount':'1 cup','url':"background: #000 url('images/redw.jpg') no-repeat"},

    {'giLevel':'Low','color':'Black','category':'','amount':'1 ounce','url':"background: #000 url('images/same.jpg') no-repeat"},
    {'giLevel':'High','color':'Red','category':'','amount':'1tbsp','url':"background: #000 url('images/saff.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Protein','amount':'3oz','url':"background: #000 url('images/egg.jpg') no-repeat"},
    {'giLevel':'High','color':'Yellow','category':'','amount':'1cup','url':"background: #000 url('images/oat.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Vegetables','amount':'1tbsp','url':"background: #000 url('images/gar.jpg') no-repeat"},

    {'giLevel':'Low','color':'Pink','category':'Meat','amount':'3oz','url':"background: #000 url('images/chib.jpg') no-repeat"},
    {'giLevel':'Low','color':'Pink','category':'Seafood','amount':'3oz','url':"background: #000 url('images/shri.jpg') no-repeat"},
    {'giLevel':'Low','color':'Yellow','category':'','amount':'1cup','url':"background: #000 url('images/soyb.jpg') no-repeat"},
    {'giLevel':'Low','color':'white','category':'Diary','amount':'1 ounce','url':"background: #000 url('images/cc.jpg') no-repeat"},
    {'giLevel':'Low','color':'Pink','category':'Meat','amount':'3oz','url':"background: #000 url('images/tb.jpg') no-repeat"},

    {'giLevel':'Low','color':'White','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/tila.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'Meat','amount':'1 ounce','url':"background: #000 url('images/edm.jpg') no-repeat"},
    {'giLevel':'Low','color':'Brown','category':'','amount':'1 cup','url':"background: #000 url('images/quin.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/sca.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'Meat','amount':'1 ounce','url':"background: #000 url('images/lj.jpg') no-repeat"},

    {'giLevel':'Low','color':'Yellow','category':'','amount':'1 ounce','url':"background: #000 url('images/cp.jpg') no-repeat"},
    {'giLevel':'Low','color':'White','category':'Seafoods','amount':'3oz','url':"background: #000 url('images/ost.jpg') no-repeat"},
    {'giLevel':'Low','color':'Black','category':'Legumes','amount':'1 ounce','url':"background: #000 url('images/ssed.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/rpp.jpg') no-repeat"},

    {'giLevel':'Low','color':'Brown','category':'Legumes','amount':'1 ounce','url':"background: #000 url('images/hazn.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Legumes','amount':'1 ounce','url':"background: #000 url('images/pis.jpg') no-repeat"},
    {'giLevel':'Low','color':'Brown','category':'Legumes','amount':'1oz','url':"background: #000 url('images/miso.jpg') no-repeat"},
    {'giLevel':'Medium','color':'Yellow','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/pap.jpg') no-repeat"},
    {'giLevel':'Low','color':'Pink','category':'Legumes','amount':'3oz','url':"background: #000 url('images/salm.jpg') no-repeat"},

    {'giLevel':'Low','color':'Red','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/rasp.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/aspa.jpg') no-repeat"},
    {'giLevel':'Medium','color':'Purple','category':'Legumes','amount':'1 cup','url':"background: #000 url('images/br.jpg') no-repeat"},
    {'giLevel':'Medium','color':'Red','category':'Fruits','amount':'1 ounce','url':"background: #000 url('images/ras.jpg') no-repeat"},
    {'giLevel':'Medium','color':'Yellow','category':'Legumes','amount':'1 cup','url':"background: #000 url('images/barl.jpg') no-repeat"},

    {'giLevel':'Low','color':'Purple','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/egp.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Vegetables','amount':'1 cup','url':"background: #000 url('images/ok.jpg') no-repeat"},
    {'giLevel':'Low','color':'Green','category':'Fruits','amount':'1 cup','url':"background: #000 url('images/grapes.jpg') no-repeat"},
    {'giLevel':'Low','color':'Red','category':'Legumes','amount':'1 cup','url':"background: #000 url('images/apple.jpg') no-repeat"},
    {'giLevel':'High','color':'Brown','category':'','amount':'1oz','url':"background: #000 url('images/walnut2.jpg') no-repeat"},
    {'giLevel':'High','color':'Brown','category':'','amount':'1oz','url':"background: #000 url('images/choco.jpg') no-repeat"},

    

]