"use strict";
var sparqlEndpoint = "http://ec2-34-243-201-217.eu-west-1.compute.amazonaws.com:8080/test_dental/query";
var defaultLimit = 10;
var institute = "HospitalDetails";
var queryPrefix = "?query=";
var responseFormat = "&format=json";
var txUrl = null;

try {
    var selectSimple = $('.js-select-simple');

    selectSimple.each(function() {
        var that = $(this);
        var selectBox = that.find('select');
        var selectDropdown = that.find('.select-dropdown');
        selectBox.select2({
            dropdownParent: selectDropdown
        });
    });

} catch (err) {
    console.log(err);
}

var getAutocompletionsArrayFromCsv = function(csvString) {
    var completionsArray = [];
    csvString.replace(/=|(--)+|  +|\"/g, "").split("\n").slice(3, -2).forEach(function(url) { //remove first line, as this one contains the projection variable
        completionsArray.push(url.substring(1, url.length - 1)); //remove quotes
    });
    return completionsArray;
}

var getlist = function(property) {
    property = property.replace(/ +/g, "");
    var queryStr = "PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX ns:<http://www.example.org/ns#>\n" +
        "SELECT DISTINCT ?" + property + " WHERE {\n" + "?entity vcard:Address ?uri .\n"
    var countyPredicate = "?uri vcard:county ?" + property + "}\n"
    var instituteNamePredicate = "?entity foaf:name ?" + property + "}\n"
    var streetPredicate = "?uri vcard:address_key ?" + property + "}\n"
    var addressPredicate = "?uri vcard:full_address ?" + property + "}\n"

    var predicate = (function(prop) {
        switch (prop) {
            case "name":
                return instituteNamePredicate;
            case "County":
                return countyPredicate;
            case "Street":
                return streetPredicate;
            case "Region":
                return addressPredicate;
            default:
                return instituteNamePredicate;
        }
    })(property);

    var cb = function(data) {
        //console.log(data);
        var input = document.getElementById("where");
        var awesomplete = new Awesomplete(input);
        awesomplete.list = getAutocompletionsArrayFromCsv(data);
        return data;
    }
    var listUrl = sparqlEndpoint + queryPrefix + encodeURIComponent(queryStr + predicate) + "&format=text";
    console.log(listUrl)
    $.ajax({
        url: listUrl,
        type: 'GET',
        success: function(res) {
            cb(res)
        }
    });
}


$(document).ready(function() {
    $(".yasr").hide();
    $("#close").hide();

    $('.tab-list__link').on('click', function() {
        var active_tab = $(tab)[0];
        institute = (function(tab) {
            switch (tab) {
                case 1:
                    return "HospitalDetails";
                case 2:
                    return "HealthCenterDetails";
                case 3:
                    return "NursingHomeDetails";
                case 4:
                    return "DentalDetails";
                case 5:
                    return "PharmacyDetails";
                default:
                    return "HospitalDetails";
            }
        })(active_tab);
        //console.log("Query intended for " + institute);

    });

    $("#close").click(function() {
        $(".yasr").hide();
        $("#close").hide();
    });


    var searchQuery = function() {
        $(".yasr").show();
        $("#close").show();

        console.log('call received!');
        var locationPredicate = document.getElementById("locationpredicate").value;
        var nearPredicate = document.getElementById("nearpredicate").value;
        if (nearPredicate == "Any" && locationPredicate == "All Ireland") {
            var queryStr = "PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX ns:<http://www.example.org/ns#>\n" +
                "SELECT DISTINCT ?name ?street ?county ?full_address WHERE {\n" +
                "?entity a ns:" + institute + " .\n" +
                "?entity vcard:Address ?uri .\n" +
                "?entity foaf:name ?name .\n" +
                "?uri vcard:county ?county .\n" +
                "?uri vcard:address_key ?street .\n" +
                "?uri vcard:full_address ?full_address }\n" +
                "LIMIT " + defaultLimit;
            //console.log("Query: " + queryStr);
            txUrl = sparqlEndpoint + queryPrefix + encodeURIComponent(queryStr) + responseFormat;
            //console.log("GET Request: " + txUrl);
        }
        console.log(locationPredicate + " " + nearPredicate);

        var cb = function(data) {
            //console.log(JSON.stringify(data))

        }
        $.ajax({
            url: txUrl,
            type: 'GET',
            success: function(res) {
                cb(res)
                yasr.setResponse({
                    response: res,
                    contentType: "application/json"
                });
            }
        });
    }
    $("#submit").click(searchQuery);
})