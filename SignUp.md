layout: page
title: "Sign Up"
permalink: https://jalenpaul.github.io/SyndeoWebsite/SyndeoWebsite/HTML/SignUp

<!DOCTYPE html>
<meta charset="UTF-8">
<html>

<head>
    <link rel="styleSheet" type="text/css" href="/SyndeoWebsite/SyndeoWebsite/CSS/MainStyles.css">
    <link rel="styleSheet" type="text/css" href="/SyndeoWebsite/SyndeoWebsite/CSS/LoginOrSignUpStyles.css">
    <title>Login or Sign Up</title>
</head>

<body>
    <article id="article_lOSU">
        <h1 id="h1_lOSU">Sign Up</h1>
        <div id="div_lOSU_PFP">
            <img id="img_lOSU_pfp" src="/SyndeoWebsite/SyndeoWebsite/Res/PNGs/img_syndeo_pfp.png">
            <section id="section_lOSU_pfp">

                <div id="div_lOSU_addPFP">
                    <button id="b_lOSU_addPFP"><a id="a_lOSU_addPFP" href="javascript: void(0)">+</a></button>
                    <input id="input_lOSU_addPFP" type="file" name="upload" accept=".png, .jpg, .jpeg" />
                </div>

                <button id="b_lOSU_resetPFP">⥀</button>
            </section>
        </div>
        <form id="form_lOSU">
            <input id="input_lOSU_username" type="text" placeholder="username">
            <input id="input_lOSU_identifier" placeholder="email" type="text">
            <input id="input_lOSU_password" type="password" placeholder="password">
            <input id="input_lOSU_submit" value="Submit" type="submit">
        </form>
        <button id="b_lOSU_changeForm" onclick="changeFormClick()">Login</button>
    </article>
    <script src="/SyndeoWebsite/SyndeoWebsite/JS/SignUp.js" text="text/javascript" type="module"></script>
</body>

</html>
