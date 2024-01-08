$(document).ready(function() {
    // ページ遷移やアラートに関するイベントハンドラー
    $("#createBusinessIdea").click(function() {
        alert("起業案の新規作成ページへようこそ！");
        window.location.href = "http://127.0.0.1:5500/create_idea.html";
    });

    $("#viewBusinessHistory").click(function() {
        alert("起業案の履歴を確認します。");
        // ここに履歴確認ページへのリンクや機能を追加する
    });

    $("#registerPersonality").click(function() {
        alert("パーソナリティの新規登録ページへようこそ！");
        // ここに新規登録ページへのリンクや機能を追加する
    });

    $("#viewPersonalityHistory").click(function() {
        alert("パーソナリティ履歴を確認します。");
        // ここに履歴確認ページへのリンクや機能を追加する
    });

    // アイデアの登録
    $("#submitIdea").click(function() {
        var ideaName = $("#ideaName").val();
        if(ideaName) {
            $("#displayIdeaName").text(ideaName);
            $(this).hide();
            $("#question1").show();
            $(".display-container").show();
        } else {
            alert("アイデア名を入力してください。");
        }
    });

    // 次の質問に進む
    $(".nextQuestion").click(function() {
        var nextId = $(this).data("next");
        var currentId = $(this).parent().attr("id");
        var answerId = "answer" + currentId.replace("question", "");
        var answer = $("#" + answerId).val();
        if(answer) {
            $("#" + currentId).hide();
            $("#" + nextId).show();
        } else {
            alert("回答を入力してください。");
        }
    });

    // 一時保存
    $(".temporarySave").click(function() {
        $("#displayAnswers").empty();
        $(".questionSection").each(function(index) {
            var questionId = $(this).attr("id");
            var questionLabel = $("label[for='" + questionId.replace("question", "answer") + "']").text();
            var answerId = "answer" + questionId.replace("question", "");
            var answer = $("#" + answerId).val();
            if(answer) {
                var answerHtml = "<div class='display-answer' data-target='#" + questionId + "'>";
                answerHtml += "<strong>" + questionLabel + ":</strong> " + answer;
                answerHtml += "</div>";  // 編集ボタンを削除
                $("#displayAnswers").append(answerHtml);
            }
        });
        alert("一時保存しました。");
    });

    // 保存された回答の編集
    $(document).on('click', '.display-answer', function() {
        var targetQuestionSelector = $(this).data('target'); // data-targetからセレクタを取得
        var targetQuestion = $(targetQuestionSelector);
        var targetTextarea = targetQuestion.find('textarea');
        $('html, body').animate({
            scrollTop: targetQuestion.offset().top
        }, 1000);
        targetTextarea.focus();
    });

    // 前の質問に戻るボタンのクリックイベント
    $(document).on('click', '.prevQuestion', function() {
        var prevId = $(this).data('prev');
        var currentId = $(this).parent().attr('id');
        var answerId = "answer" + currentId.replace("question", "");
        
        // 現在の質問の回答を更新（必要に応じて）
        var currentAnswer = $("#" + answerId).val();
        // ここでcurrentAnswerを保存または処理するコードを追加

        // 前の質問セクションを表示
        $("#" + currentId).hide();
        $("#" + prevId).show();
    });

    // 最終保存
    $("#finalSave").click(function() {
        $(".form-container").hide();
        $("#displayAnswers").empty();
        $(".questionSection").each(function() {
            var questionId = $(this).attr("id");
            var questionLabel = $("label[for='" + questionId.replace("question", "answer") + "']").text();
            var answerId = "answer" + questionId.replace("question", "");
            var answer = $("#" + answerId).val();
            if(answer) {
                $("#displayAnswers").append("<div class='display-answer'><strong>" + questionLabel + ":</strong> " + answer + "</div>");
            }
        });
        $(".display-container").show();
        alert("すべての回答が保存されました。");
    });

    // 最初のページに戻る
    $("#goBack").click(function() {
        window.location.href = "http://127.0.0.1:5500/index.html";
    });

    document.addEventListener('DOMContentLoaded', function() {
        const finalSaveButton = document.getElementById('finalSave');
        if (finalSaveButton) {
            finalSaveButton.addEventListener('click', savePersonalityAnalysis);
        }
    });
});

$(document).ready(function() {
    // アイデアの登録または更新
    $("#submitIdea, #updateIdeaName").click(function() {
        var ideaName = $("#ideaName").val();
        if(ideaName) {
            $("#displayIdeaName").text(ideaName); // アイデア名を表示エリアに設定
            $("#submitIdea").hide();
            $("#updateIdeaName").show();
            $(".display-container").show(); // 保存された情報のエリアを表示する
        } else {
            alert("アイデア名を入力してください。");
        }
    });

    // 次の質問に進むまたは一時保存
    $(".nextQuestion, .temporarySave").click(function() {
        var currentIdeaName = $("#displayIdeaName").text();
        var newIdeaName = $("#ideaName").val();
        if (newIdeaName && newIdeaName !== currentIdeaName) {
            $("#displayIdeaName").text(newIdeaName); // アイデア名を新しいものに更新
        }

        // 次の質問に進む処理や一時保存処理はここに追加
        // ...
    });

    // 前の質問に戻る処理や最終保存処理など、その他の機能は元のコードに従って追加
    // ...
});

function saveBusinessIdea() {
    const ideaName = document.getElementById('ideaName').value; // 起業アイデア名を取得
    const answers = []; // 回答を格納する配列
    // すべての回答を配列に格納
    for (let i = 1; i <= 6; i++) {
        answers.push(document.getElementById('answer' + i).value);
    }
    // localStorageに起業アイデア名と回答を保存
    localStorage.setItem('businessIdea', JSON.stringify({ideaName: ideaName, answers: answers}));
}

function savePersonalityAnalysis() {
    const personalityName = document.getElementById('personalityName').value; // 自己分析の名前を取得
    const responses = []; // 回答を格納する配列
    // すべての回答を配列に格納
    for (let i = 1; i <= 9; i++) {
        responses.push(document.getElementById('response' + i).value);
    }
    // localStorageに自己分析の名前と回答を保存
    localStorage.setItem('personalityAnalysis', JSON.stringify({personalityName: personalityName, responses: responses}));
}

function viewHistory() {
    const businessIdea = JSON.parse(localStorage.getItem('businessIdea')); // 起業アイデアのデータを取得
    const personalityAnalysis = JSON.parse(localStorage.getItem('personalityAnalysis')); // 自己分析のデータを取得

    // 起業アイデアのデータを表示
    if (businessIdea) {
        document.getElementById('displayIdeaName').innerText = businessIdea.ideaName;
        businessIdea.answers.forEach((answer, index) => {
            const para = document.createElement("p");
            para.innerText = `回答 ${index + 1}: ${answer || '情報なし'}`;
            document.getElementById('displayAnswers').appendChild(para);
        });
    }

    // 自己分析のデータを表示
    if (personalityAnalysis) {
        document.getElementById('displayPersonalityName').innerText = personalityAnalysis.personalityName;
        personalityAnalysis.responses.forEach((response, index) => {
            const para = document.createElement("p");
            para.innerText = `回答 ${index + 1}: ${response || '情報なし'}`;
            document.getElementById('displayResponses').appendChild(para);
        });
    }
}

function savePersonalityAnalysis() {
    const name = document.getElementById('ideaName').value; // 名前を取得
    const responses = []; // 回答を格納する配列
    for (let i = 1; i <= 9; i++) { // 9つの質問に対する回答を取得
        responses.push(document.getElementById('answer' + i).value);
    }
    // localStorageに自己分析の名前と回答を保存
    localStorage.setItem('personalityAnalysis', JSON.stringify({name: name, responses: responses}));
}


