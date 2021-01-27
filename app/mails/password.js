 export const temple_password = (name,email,password) => {
     const html=`
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }
        .img-wrapper{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #1572b4;
            font-size: 9px;
        }
        .text_img{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            top: 98px;
        }
        
        .img-wrapper>img{
            height: 100px;
        }
        .box{
            background-color: white;
            box-shadow: 1px 1px 4px #d5d5d5;
            padding: 10px;
            background-image: url('https://sheltered-thicket-07747.herokuapp.com/imgage/ssvback.svgg');
        }
        .part1,.part2,.part3{
            display: flex;
            flex-direction: column;
        }
        h1{
            font-size: 20px;
            font-weight: 600;
            text-transform: capitalize;
        }
        .part3{
            justify-content: center;
            align-items: center;
        }
        button {
            padding: 10px;
            border: none;
            background-color: #3172B4;
            color: white;
            border-radius: 20px;
            font-size: large;
        }
         
    </style>
</head>
<body>
    <div class="box-wrapper">

        <div class="box" >
            <div class="img-wrapper">
                <img src="https://sheltered-thicket-07747.herokuapp.com/imgage/logo_no_footer.svg"/>
               <div class="text_img" >
                <strong>مكتب تحصيل الديون</strong>
                <strong>Cabinet du Recouvrement de Créances</strong>
               </div>
            </div>
            <h1>bienvenue ${name}</h1>
            <p class="part1">
                merci de nous rejoindre et de nous faire confiance
            </p>
            <p class="part2">
                c’est vous les informations d’identification pour accéder à votre espace et suivre vos documents
    
            <strong> utilisateur: ${email}</strong>
            <strong>password: ${password}</strong>
            </p>
            <div class="part3">
                <p>pour changer votre mot de passe cliquez ici</p>
                <a>
                    <button>changer mot de passe</button>
    
                </a>
            </div>
        </div>
    </div>
    
    
</body>
</html>
     `


     return html
 }