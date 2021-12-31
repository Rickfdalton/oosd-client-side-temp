<?php
        
        require_once('../Main/credential.php');
        require_once("../Main/Database.php");

         $db = new Database(HOST, USER, DB_PASS, DB);
     
         $records = $db->fetch_vac();

        $locations = mysqli_fetch_all ($records, MYSQLI_ASSOC);
        echo json_encode($locations );
        

  ?>      
    
    
