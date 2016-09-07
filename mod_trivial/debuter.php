<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <link rel="stylesheet" href="../style/style.css">
		<title>Trivial Pursuit</title>
        <link rel="icon" type="image/png" href="../images/baseball.gif" />
	</head>
	<body>
        <div id="bloc_page">
            <?php include("header.php"); ?>
            <div id="bloc_jeux">
                <h2>Bienvenue dans le jeu Trivial Pursuit</h2>
                
                <p>Cliquez sur le bouton Jouer pour commencer</p>

                <form name="Jouer"  action="/jouer">
                    <input type="submit" value="Jouer" />
                </form>
            </div>
        </div>
	</body>
</html>
