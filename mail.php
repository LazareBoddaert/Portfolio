//Contact Form in PHP
<?php
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $phone = htmlspecialchars($_POST['phone']);
  $object = htmlspecialchars($_POST['object']);
  $city = htmlspecialchars($_POST['city']);
  $message = htmlspecialchars($_POST['message']);

  if(!empty($city)){
    echo "Action suspecte, êtes-vous vraiment humain ?";
  }elseif(!empty($email) && !empty($message) && !empty($name) && !empty($object)){
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
      $receiver = "contact@lazareboddaert.com"; //enter that email address where you want to receive all messages
      $subject = "$object";
      $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
      $sender = "From: $email";
      if(mail($receiver, $subject, $body, $sender)){
         echo "Message envoyé !";
      }else{
         echo "Impossible d'envoyer le message...\nMerci de réessayer plus tard ou de me contacter directement à 'contact@lazareboddaert.com'";
      }
    }else{
      echo "Adresse email non valide";
    }
  }else{
    echo "Merci de remplir tous les champs demandés";
  }
?>
