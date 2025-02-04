console.log(
    "%c Website: NguyenLieuGiaRe.Com %c",
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:24px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;"
);
console.log(
    "%c Coder: Justin Tung %c",
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:24px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;"
);
console.log(
    "%c Contact: https://zalo.me/0366965719/ %c",
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:24px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;"
);
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    let pathMenu = window.location.href;
    $("ul#iq-sidebar-toggle a").each(function () {
        if (this.href === pathMenu) {
            $(this).addClass("sub-menu active");
            $(this).parent().closest("li").addClass("active"); //added this line to include the parent
            let subMenu = $(this).parent().closest("ul");
            if (subMenu) {
                subMenu.addClass("show");
                $(this).parent().parent().closest("li").addClass("active");
            }
        }
    });

    let channel = pusher.subscribe("notification");
    if (typeof profile !== "undefined") {
        channel.bind(`user-${profile.id}`, function (payload) {
            // toastr[`${payload.status}`](`${payload.message}`,'ThĂ´ng bĂ¡o');
            swal(`${payload.message}`, `${payload.status}`);
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
    $("form[submit-ajax=hvl]").submit(function (e) {
        e.preventDefault();
        let _this = this;
        let url = $(_this).attr("action");
        let method = $(_this).attr("method");
        let href = $(_this).attr("href");
        let api_token = $(_this).attr("api_token");
        let data = $(_this).serialize();
        let button = $(_this).find("button[type=submit]");
        if (button.attr("order")) {
            Swal.fire({
                title: "XĂ¡c nháº­n thanh toĂ¡n!",
                text: button.attr("order"),
                icon: "warning",
                showCancelButton: true,
                // confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "TĂ´i Ä‘á»“ng Ă½",
                cancelButtonText: "ÄĂ³ng",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "warning",
                        title: "Äang xá»­ lĂ½, vui lĂ²ng chá», nghiĂªm cáº¥m táº¯t trĂ¬nh duyá»‡t, f5 trang trĂ¡nh há»¥t Ä‘Æ¡n máº¥t tiá»n!",
                        timer: 180000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    submitForm(url, method, href, api_token, data, button);
                }
            });
        } else {
            submitForm(url, method, href, api_token, data, button);
        }
    });
});

function submitForm(url, method, href, api_token, data, button) {
    let textButton = button.html().trim();
    let setting = {
        type: method,
        url,
        data,
        dataType: "json",
        beforeSend: function () {
            button
                .prop("disabled", !0)
                .html(
                    '<em class="fas fa-spinner fa-spin"></em>&nbsp;Äang xá»­ lĂ½...'
                );
        },
        complete: function () {
            button.prop("disabled", !1).html(textButton);
        },
        success: function (response) {
            if (button.attr("callback")) {
                window[`${button.attr("callback")}`](response);
            }
            swal(
                response.message,
                response.status === true ? "success" : "error"
            );
            if (response.status === true && !button.attr("href")) {
                setTimeout(() => {
                    if (!href) {
                        window.location.reload();
                        return;
                    }
                    window.location.href = href;
                }, 2000);
            }
        },
        error: function (error) {
            console.log(error);
        },
    };
    if (api_token) {
        setting["headers"] = {
            "Api-Token": api_token,
        };
    }
    $.ajax(setting);
}

function swal(text, icon) {
    Swal.fire({
        icon,
        title: text,
        // html: text,
        confirmButtonText: "TĂ´i Ä‘Ă£ hiá»ƒu",
        // confirmButtonColor: "#3085d6",
    });
}

function getTime() {
    return parseInt(new Date().getTime() / 1000);
}

function wait(t, e, n) {
    return e
        ? $(t).prop("disabled", !1).html(n)
        : $(t)
              .prop("disabled", !0)
              .html(
                  '<em class="fas fa-spinner fa-spin"></em>&nbsp;Äang xá»­ lĂ½...'
              );
}

function formatNumber(nStr, decSeperate = ".", groupSeperate = ",") {
    nStr += "";
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + groupSeperate + "$2");
    }
    return x1 + x2;
}

function coppy(element) {
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(
        typeof element === "string" ? document.getElementById(element) : element
    );
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    swal("Sao chĂ©p thĂ nh cĂ´ng", "success");
}

function statusOrder(status) {
    let msg = "";
    switch (status) {
        case "Success":
            msg =
                '<button type="button" class="btn btn-success btn-sm">ÄĂ£ hoĂ n thĂ nh</button>';
            break;
        case "Pause":
            msg =
                '<button type="button" class="btn btn-danger btn-sm">ÄĂ£ há»§y</button>';
            break;
        case "Report":
            msg =
                '<button type="button" class="btn btn-warning btn-sm">Táº¡m dá»«ng</button>';
            break;
        case "Refund":
            msg =
                '<button type="button" class="btn btn-success btn-sm">ÄĂ£ hoĂ n tiá»n</button>';
            break;
        case "Waiting":
            msg =
                '<button type="button" class="btn btn-warning btn-sm">Chá» há»§y</button>';
            break;
        case "Expired":
            msg =
                '<button type="button" class="btn btn-danger btn-sm">ÄĂ£ háº¿t háº¡n</button>';
            break;
        case "CookieDie":
            msg =
                '<button type="button" class="btn btn-danger btn-sm">Cookie die</button>';
            break;
        case "ProxyError":
            msg =
                '<button type="button" class="btn btn-warning btn-sm">Proxy lá»—i</button>';
            break;
        default:
            msg =
                '<button type="button" class="btn btn-info btn-sm">Äang hoáº¡t Ä‘á»™ng</button>';
            break;
    }
    return msg;
}

function timeCreated(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}
function isURL(str) {
    var regex =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var pattern = new RegExp(regex);
    return pattern.test(str);
}

function cancelOrder(url, code_order, id) {
    Swal.fire({
        title: "XĂ¡c nháº­n!",
        text: `Báº¡n cĂ³ muá»‘n há»§y Ä‘Æ¡n: ${code_order} ?, chĂºng tĂ´i sáº½ khĂ´ng hoĂ n tiá»n cho Ä‘Æ¡n Ä‘Ă£ há»§y!`,
        icon: "warning",
        showCancelButton: true,
        // confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "TĂ´i Ä‘á»“ng Ă½",
        cancelButtonText: "ÄĂ³ng",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url,
                headers: {
                    "Api-Token": profile.api_token,
                },
                data: {
                    id,
                },
                dataType: "json",
                success: function (response) {
                    swal(
                        response.message,
                        response.status === true ? "success" : "error"
                    );
                    if (response.status === true) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                },
            });
        }
    });
}

function reportOrder(url, code_order, id) {
    Swal.fire({
        title: "XĂ¡c nháº­n!",
        text: `Báº¡n Ä‘Ă£ kháº¯c phá»¥c lá»—i Ä‘Æ¡n á»Ÿ má»¥c chi tiáº¿t vĂ  muá»‘n kĂ­ch hoáº¡t Ä‘Æ¡n: ${code_order} ?`,
        icon: "warning",
        showCancelButton: true,
        // confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "TĂ´i Ä‘á»“ng Ă½",
        cancelButtonText: "ÄĂ³ng",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url,
                headers: {
                    "Api-Token": profile.api_token,
                },
                data: {
                    id,
                },
                dataType: "json",
                success: function (response) {
                    swal(
                        response.message,
                        response.status === true ? "success" : "error"
                    );
                    if (response.status === true) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                },
            });
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function convert_to_id(link) {
    var result = null;
    link = link.trim();
    var post_id = link["match"](/(.*)\/posts\/([0-9]{8,})/);
    var photo_id = link["match"](/(.*)\/photo.php\?fbid=([0-9]{8,})/);
    var photo_id_2 = link["match"](/(.*)\/photo\?fbid=([0-9]{8,})/);
    var photo_id_3 = link["match"](/(.*)\/photo\/\?fbid=([0-9]{8,})/);
    var video_id = link["match"](/(.*)\/video.php\?v=([0-9]{8,})/);
    var story_id = link["match"](/(.*)\/story.php\?story_fbid=([0-9]{8,})/);
    var link_id = link["match"](/(.*)\/permalink.php\?story_fbid=([0-9]{8,})/);
    var other_id = link["match"](/(.*)\/([0-9]{8,})/);
    var other_id_2 = link["match"](/^[0-9.]+$/);
    var comment_id = link["match"](/(.*)comment_id=([0-9]{8,})/);

    if (post_id) {
        return (result = post_id[2]);
    }

    if (photo_id) {
        return (result = photo_id[2]);
    }

    if (video_id) {
        return (result = video_id[2]);
    }

    if (story_id) {
        return (result = story_id[2]);
    }

    if (link_id) {
        return (result = link_id[2]);
    }

    if (other_id) {
        return (result = other_id[2]);
    }

    if (other_id_2) {
        return (result = other_id_2[0]);
    }

    if (photo_id_2) {
        return (result = photo_id_2[2]);
    }

    if (photo_id_3) {
        return (result = photo_id_3[2]);
    }

    if (comment_id) {
        return (result += "_" + comment_id[2]);
    }
}

function igGetUsername(elm) {
    $("#buy").prop("disabled", true);
    setTimeout(() => {
        let link = $("[name=" + elm + "]").val();
        if (!isURL(link)) {
            $("#buy").prop("disabled", false);
            return;
        }
        $("[name=" + elm + "]")
            .prop("disabled", true)
            .val("Äang xá»­ lĂ½");
        let username = link["match"](/instagram.com\/([a-zA-Z0-9_.-]+)/);
        if (username) {
            username = username[1];
            $("[name=" + elm + "]")
                .prop("disabled", false)
                .val(username);
        } else {
            $("[name=" + elm + "]")
                .prop("disabled", false)
                .val("");
        }
        $("#buy").prop("disabled", false);
    }, 100);
}

function igGetIdpost(elm) {
    $("#buy").prop("disabled", true);
    setTimeout(() => {
        let link = $("[name=" + elm + "]").val();
        if (!isURL(link)) {
            $("#buy").prop("disabled", false);
            return;
        }
        $("[name=" + elm + "]")
            .prop("disabled", true)
            .val("Äang xá»­ lĂ½");
        let idpost = link["match"](/com\/p\/([a-zA-Z0-9_.-]+)/);
        if (idpost) {
            idpost = idpost[1];
            $("[name=" + elm + "]")
                .prop("disabled", false)
                .val(idpost);
        } else {
            $("[name=" + elm + "]")
                .prop("disabled", false)
                .val("");
        }
        $("#buy").prop("disabled", false);
    }, 100);
}

function ttGetUsername(elm) {
    $("#buy").prop("disabled", true);
    setTimeout(() => {
        let link = $("[name=" + elm + "]").val();
        if (!isURL(link)) {
            $("#buy").prop("disabled", false);
            return;
        }
        $("[name=" + elm + "]")
            .prop("disabled", true)
            .val("Äang xá»­ lĂ½");
        let username = link["match"](/tiktok.com\/@([a-zA-Z0-9_.-]+)/);
        if (username) {
            username = username[1];
            $("[name=" + elm + "]")
                .prop("disabled", false)
                .val(username);
        } else {
            $("[name=" + elm + "]")
                .prop("disabled", false)
                .val("");
        }
        $("#buy").prop("disabled", false);
    }, 100);
}