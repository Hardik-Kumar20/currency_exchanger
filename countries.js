const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };



const baseUrl =`https://v6.exchangerate-api.com/v6/4ca602df5a40bb970e05af90/latest/USD`
// now putting all these countries inside dropdown
const selectElements=document.querySelectorAll(".countries ");
const fromflag = document.querySelectorAll(".from")
const toflag = document.querySelectorAll(".to")

selectElements.forEach(selectElement=>{
  Object.entries(countryList).forEach(([currency , country])=>{
    let newOption = document.createElement("option");
    newOption.innerText=currency;
    newOption.value=currency;
    if (selectElement.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (selectElement.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    selectElement.append(newOption);
  })
  selectElement.addEventListener("change", (evt) => {
    updateFlag(evt.target);
   
  });
})


function updateFlag(element) {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
 
    img.src = newsrc;
}

let fromElement = document.querySelector("#countrie1");
let from2='USD';
let from=fromElement.addEventListener("change", (evt) => {
  from2 = evt.target.value
  console.log(from2);
  updaterate();
  maincalculation(conversionRates,to,from2);
});

const updaterate=async ()=>{
  let amnt = document.querySelector(".form input");
  let amount=amnt.value;
  let URL = `https://v6.exchangerate-api.com/v6/4ca602df5a40bb970e05af90/latest/${from2}`
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data.conversion_rates)
  conversionRates = data.conversion_rates;
    displayConversionRate();
    maincalculation(conversionRates,to,from2);
}
const displayConversionRate = () => {
  if (conversionRates[to]) {
      console.log(`Conversion rate from ${from2} to ${to}: ${conversionRates[to]}`);
  } else {
      console.log(`No conversion rate available for ${to}`);
  }
};
let fromElement2=document.querySelector("#countrie2");
let from3=fromElement2.addEventListener("change",(evt)=>{
  to= evt.target.value;
  console.log(to);
  displayConversionRate();
  maincalculation(conversionRates,to,from2);
})

//now calculations
 const maincalculation=(conversionRates,to,from2)=>{
let input= document.querySelector(".input").value;
let ans=Math.round( input*conversionRates[to]);
console.log(ans)
let text=document.querySelector(".statement");
text.innerHTML= `${input} ${from2} is equal to ${ans} ${to}.`
 }
 maincalculation();


