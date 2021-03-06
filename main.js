//各レアリティのLv MAXに必要な経験値
var exp_ps_max = 2186965;
var exp_p_max = 582014;
var exp_gs_max = 1067776;
var exp_g_max = 298829;
var exp_ss_max = 388009;
var exp_s_max = 185879;
var exp_bs_max = 136311;
var exp_b_max = 34880;

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

    else if (rareIndex == "p") {
        rareLvMax(80);
    }

    else if (rareIndex == "gs") {
        rareLvMax(110);
    }

    else if (rareIndex == "g") {
        rareLvMax(65);
    }

    else if (rareIndex == "ss") {
        rareLvMax(80);
    }

    else if (rareIndex == "s") {
        rareLvMax(60);
    }

    else if (rareIndex == "bs") {
        rareLvMax(60);
    }

    else if (rareIndex == "b") {
        rareLvMax(35);
    }

    function rareLvMax(max) {

        lessonLv.options.length = 0;

        for (var i = 0; i < max; i++) {
            lessonLv.options[i] = new Option(i + 1);
        }

    }

}

//csvパース
function convertCSVtoArray(str) {
    var result = [];
    var tmp = str.split("\n");

    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }

    return result;
}

//レベル
function lessonLvPost() {

    //配列判別用変数定義
    var indexLv = document.lesson.lessonLv.selectedIndex;

    var lessonRare = document.forms.lesson.lessonRare;
    var ifRare = lessonRare.options[lessonRare.selectedIndex].value;

    var indexRare = 0;
    var indexExp = 0;
    var expMax = 0;
    var exp = 0;

    //レアリティ別判定でcsv列とレアリティごとのレベルMAXに必要な経験値を入れる
    if (ifRare == "ps") {
        indexRare = 8;
        expMax = exp_ps_max;
    }

    else if (ifRare == "p") {
        indexRare = 7;
        expMax = exp_p_max;
    }

    else if (ifRare == "gs") {
        indexRare = 6;
        expMax = exp_gs_max;
    }

    else if (ifRare == "g") {
        indexRare = 5;
        expMax = exp_g_max;
    }

    else if (ifRare == "ss") {
        indexRare = 4;
        expMax = exp_ss_max;
    }

    else if (ifRare == "s") {
        indexRare = 3;
        expMax = exp_s_max;
    }

    else if (ifRare == "bs") {
        indexRare = 2;
        expMax = exp_bs_max;
    }

    else if (ifRare == "b") {
        indexRare = 1;
        expMax = exp_b_max;
    }

    indexExp = convertCSVtoArray(idolLvCsv);

    //残りExp
    exp = expMax - indexExp[indexLv][indexRare];

    expCount(exp, b10, "B10餌の場合:", "b10", expMax)
    expCount(exp, bs10, "BS10餌の場合:", "bs10", expMax)
    expCount(exp, bs14, "BS14餌の場合:", "bs14", expMax)
    expCount(exp, s10, "S10餌の場合:", "s10", expMax)
    expCount(exp, s13, "S13餌の場合:", "s13", expMax)
    expCount(exp, s30, "S30餌の場合:", "s30", expMax)
    expCount(exp, exp_connie_red, "赤ジャージの場合:", "red", expMax)
    expCount(exp, exp_connie_green, "緑ジャージ:", "green", expMax)
    expCount(exp, exp_connie_rainbow, "虹色ジャージの場合:", "rainbow", expMax)
    
    function expCount(exp, esa, esaTagText, esaTag, expMax) {
        count = Math.ceil(exp / esa);
        document.getElementById(esaTag + "Text").textContent = esaTagText + count + "体";
        Amari = Math.abs(exp - (esa * count));
        document.getElementById(esaTag + "AmariText").textContent = "オーバーしてしまう経験値:" + Amari;
    
    }
}

