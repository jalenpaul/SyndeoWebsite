layout: page
title: "Create Post"
permalink: https://jalenpaul.github.io/SyndeoWebsite/SyndeoWebsite/HTML/CreatePost

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="styleSheet" type="text/css" href="/CSS/MainStyles.css">
    <link rel="styleSheet" type="text/css" href="/CSS/CreatePostStyles.css">
    <title>Create Post</title>
</head>

<body>
    <nav id="nav_PM" class="navbar">
        <div class="container-fluid">
            <a id="a_CP_navBarTitle" class="navbar-brand" href="https://jalenpaul.github.io/SyndeoWebsite/SyndeoWebsite/HTML/Home">
                <img src="/Res/PNGs/img_syndeo_appcover.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            </a>
        </div>
    </nav>


    <article id="article_CP">
        <h2>Select Post Type</h2>

        <a >
            <button class="ButtonCreatePost" id="b_CP_image">
                <div id="div_CP_image">
                    <img class="CreatePostDisplay" src="/Res/SVGs/img_create_post_image.svg">
                    <h3>Image</h3>
                </div>
            </button>
        </a>

        <a>
            <button class="ButtonCreatePost" id="b_CP_prompt">
                <div id="div_CP_prompt">
                    <img class="CreatePostDisplay" src="/Res/SVGs/img_createpost_prompt.svg">
                    <h3>Prompt</h3>
                </div>
            </button>
        </a>

        <a>
            <button class="ButtonCreatePost" id="b_CP_moment">
                <div id="div_CP_moment">
                    <img class="CreatePostDisplay" src="/Res/SVGs/img_createpost_moment.svg">
                    <h3>Moment</h3>
                </div>
            </button>
        </a>

    </article>
</body>

</html>
