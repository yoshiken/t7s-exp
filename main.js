//各レアリティのLv MAXに必要な経験値
var exp_ps_max = 1033360;
var exp_p_max = 297415;
var exp_gs_max = 509263;
var exp_g_max = 161681;
var exp_ss_max = 198298;
var exp_s_max = 71733;
var exp_bs_max = 52681;
var exp_b_max = 24193;

//ジャージコニーの経験値
var exp_connie_red = 5000;
var exp_connie_green = 25000;
var exp_connie_rainbow = 100000;

//各レアリティの固定経験値
var exp_gs_fixing = 7000;
var exp_g_fixing = 5000;
var exp_ss_fixing = 1750;
var exp_s_fixing = 1250;
var exp_bs_fixing = 350;
var exp_b_fixing = 250;

//餌のEXP定義
var b10 = 2500;
var bs10 = 3500;
var bs14 = 4900;
var s10 = 12500;
var s13 = 16250;
var s30 = 37500;
var s40 = 50000;


//経験値計算関数
//引数:レアリティ,カードレベル,同属性,同一キャラ
function experienceCount(rare, cardLv, consanguinity, theSamePerson) {

    var exp = 0;

    //レアリティ固定値判別
    if (rare == "gs") {
        exp = exp_gs_fixing;
    } else if (rare == "g") {
        exp = exp_g_fixing;
    } else if (rare == "ss") {
        exp = exp_ss_fixing;
    } else if (rare == "s") {
        exp = exp_s_fixing;
    } else if (rare == "bs") {
        exp = exp_bs_fixing;
    } else if (rare == "b") {
        exp = exp_b_fixing;
    } else if (rare == "red") {
        exp = exp_connie_red;
    } else if (rare == "green") {
        exp = exp_connie_green;
    } else if (rare == "rainbow") {
        exp = exp_connie_rainbow;
    } else {
        console.log("レアリティ選択エラーです");
    }

    //計算値基本計算式
    exp = exp * cardLv;

    //同属性・胴キャラ補正計算
    if (consanguinity == 1) {
        exp = exp * 1.1;
    }

    if (theSamePerson == 1) {
        exp = exp * 1.2;
    }

    return exp;

}

//レッスン費用計算関数
//引数:レッスンアイドルLv,レッスンパートナーの枚数,レッスンパートナーの平均Lv
function lessonMoney(lessonIdolLv, lessonPartnerNum, lessonPartnerAve) {
    var money;

    // (レッスンアイドルのLv * 100) * レッスンパートナーの枚数 + (レッスンパートナーの平均Lv * 100)
    money = (lessonIdolLv * 100) * lessonPartnerNum + (lessonPartnerAve * 100);

    return money;

}

console.log(experienceCount("s", 14, 1, 0));
console.log(lessonMoney(6, 5, 14));


//レッスンアイドルレアリティのMAXLV書き出し
var lessonRareEvent = document.getElementById('lessonRare');

function lessonRarePost() {
    var lessonRare = document.forms.lesson.lessonRare;
    var lessonLv = document.forms.lesson.lessonLv;

    lessonLv.options.lengt = 0;
    var rareIndex = lessonRare.options[lessonRare.selectedIndex].value;

    if (rareIndex == "ps") {
        rareLvMax(140);
    }

    if (rareIndex == "p") {
        rareLvMax(80);
    }

    if (rareIndex == "gs") {
        rareLvMax(110);
    }

    if (rareIndex == "g") {
        rareLvMax(65);
    }

    if (rareIndex == "ss") {
        rareLvMax(80);
    }

    if (rareIndex == "s") {
        rareLvMax(60);
    }

    if (rareIndex == "bs") {
        rareLvMax(60);
    }

    if (rareIndex == "b") {
        rareLvMax(35);
    }

    function rareLvMax(max) {

        lessonLv.options.length = 0;

        for (var i = 0; i < max; i++) {
            lessonLv.options[i] = new Option(i + 1);
        }

        console.log(i);

    }

}

//csvParse
function csv2Array() { //csvﾌｧｲﾙﾉ相対ﾊﾟｽor絶対ﾊﾟｽ
    var csvData = new Array();
    var data = new XMLHttpRequest();
    data.open("GET", "rare_exp.csv", true); //true:非同期,false:同期
    data.send(null);

    var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
    var lines = data.responseText.split(LF);
    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(",");
        if (cells.length != 1) {
            csvData.push(cells);
        }
    }
    return csvData;
}

//レベル
function lessonLvPost() {
    console.log("push");
    var lessonLv = document.lesson.lessonLv.selectedIndex + 1;
    console.log(lessonLv);
    console.log(csv2Array());

}