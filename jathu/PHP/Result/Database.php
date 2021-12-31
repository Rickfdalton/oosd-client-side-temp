<?php
require_once 'Hospital.php';

class Database
{
    private mysqli $db;
    private string $host;
    private string $user;
    private string $password;
    private string $database;

    function __construct(string $host, string $user, string $password, string $database)
    {
        $this->host = $host;
        $this->user = $user;
        $this->database = $database;
        $this->password = $password;
        $this->db = new mysqli($host, $user, $password, $database);
        if(mysqli_connect_errno()) {
            echo "<h1>ERROR</h2>";
            exit;
        }
    }

    public function setUser($newUsername, $password)
    {
        $this->user = $newUsername;
        $this->password = $password;
        $this->db->change_user($this->user, $this->password, $this->database);
        if(mysqli_connect_errno()) {
            echo "<h1>ERROR</h2>";
            exit;
        }
    }

    public function getSearchableDetails():array
    {
        $list = array();
        $query = "SELECT Hospitals.Address, Hospitals.Name, Facilities.FacilityName FROM Facilities, Hospitals, FacilityManager WHERE Hospitals.HospitalID = FacilityManager.HospitalID AND Facilities.FacilityID = FacilityManager.FacilityID AND FacilityManager.sTime IS NOT NULL AND FacilityManager.eTime IS NOT NULL ORDER BY Hospitals.Address";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($districtName, $hospitalName, $facilityName);
        while($stmt->fetch()){
            $list[] = [$districtName, $hospitalName, $facilityName];
        }

        return $list;
    }

    public function getHospital(string $hos)
    {
        $hospital = new Hospital($hos);
        $query = "SELECT Name, FacilityName, sTime, eTime FROM Facilities, FacilityManager, Hospitals WHERE Hospitals.Name=? AND Hospitals.HospitalID=FacilityManager.HospitalID AND Facilities.FacilityID=FacilityManager.FacilityID AND sTime IS NOT NULL AND eTime IS NOT NULL";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $hos);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($name, $facilityName, $sTime, $eTime);
        while($stmt->fetch()){
            if($name != $hos) continue;
            $hospital->setFacility($facilityName, $sTime, $eTime);
        }

        return $hospital;
    }

    public function saveUsermail(string $email, string $facName, string $hosName){
        $query = "INSERT INTO Users (Email, FacilityName, HospitalName) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $emaili, $facNamei, $hosNamei);
        $emaili = $email;
        $facNamei = $facName;
        $hosNamei = $hosName;
        $stmt->execute();
        $stmt->close();
        $this->db->close();
    }

    //function to fetch Vaccination centre details
    public function fetch_vac(){
        $records= mysqli_query($this->db,"select VaccinationCenterName,Latitude,Longitude,Information from vaccinationCenters");
        return $records;
    }
}







?>