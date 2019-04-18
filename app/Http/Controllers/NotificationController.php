<?php

namespace App\Http\Controllers;

use App\Notification;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use DB;
use Redirect;
use App\Fileupload;
use MGDigital\BusQue as BusQue;

class NotificationController extends Controller
{
    public function index()
    {
        /* $leagues = DB::table('leagues')
        ->select('league_name')
        ->join('countries', 'countries.country_id', '=', 'leagues.country_id')
        ->where('countries.country_name', $country)
        ->get();
        print_r($users); exit; */

        return view('notification.index');
    }

    public function group()
    {
        $group = array(['value'=>'1','label'=>'A Group'],['value'=>'2','label'=>'B Group']);
        return json_encode($group);
    } 

    public function poll()
    {
        $poll = array(['value'=>'001','label'=>'0001'],['value'=>'002','label'=>'0002']);
        return json_encode($poll);
    }     

    public function language()
    {
        $language = array(['value'=>'Hindi','label' =>'Hindi'],
                            ['value'=>'English','label' =>'English']);
        return json_encode($language);
    }    

    public function device()
    {
        $device = array(['value' => 'ALL', 'label' => 'All Device'],
                        ['value' => 'IOS', 'label' => 'IOS'],
                        ['value' =>'Android', 'label' =>'Android']);
        return json_encode($device);
    }  
    
    public function maritial()
    {
        $maritial = array(['value' => 'No', 'label' => 'No'],['value' => 'Yes', 'label' => 'Yes']);
        return json_encode($maritial);
    }

    public function gender()
    {
      $gender = array(['value' => 'Male', 'label' => 'Male'],['value' => 'Female', 'label' => 'Female']);
        return json_encode($gender);
    }

    public function income_level()
    {
        $income_level = DB::table('user_table')->distinct()->get(['income_level']);
        return $income_level->toJson();
    }

    public function age_group()
    {
        $age_group = DB::table('user_table')->distinct()->get(['age']);
        return $age_group->toJson();
    }

    public function location()
    {
        $location = DB::table('user_table')->distinct()->get(['city']);  
        return $location->toJson();
    }
 
    public function location_para(Request $request)
    {
        $country=$request->country;  
        $state=$request->state;
        $where = ['country'=>$country,'state'=>$state];
        $location = DB::table('user_table')->where($where)->distinct()->get(['city']);  
        return $location->toJson();
    }

    public function countries()
    {
        $countries = DB::table('user_table')->distinct()->get(['country']);  
        return $countries->toJson();
    }

    public function states()
    {
        $states = DB::table('user_table')->distinct()->get(['state']);  
        return $states->toJson();
    }

    public function states_para(Request $request)
    {
        $country=$request->country;  
        $where = ['country'=>$country];
        $states = DB::table('user_table')->where($where)->distinct()->get(['state']);  
        return $states->toJson();
    }

    public function userdata()
    {
        $users = DB::table('user_table')->select('*')->get(); 
        return $users->toJson();
    }

    public function storeData(Request $request)
    {
      
        if($request->get('image')) 
        {
           $image = $request->get('image');
           $image_path = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           \Image::make($request->get('image'))->save(public_path('notification_images/').$image_path);
        }
        else{
            $image_path ='';
        }        
        $title=$request->title;
        $location= $request->location;
        $agegroup= $request->agegroup;
        $gender=$request->gender;
        $location=$request->location;
        $agegroup= $request->agegroup;
        $income= $request->income;
        $maritial= $request->maritial;
        $language= $request->language;
        $device_type= $request->device_type;
        $group=$request->group;
        $poll=$request->poll;
        $selectedDate= $request->selectedDate;
        $selectedDate = date('Y-m-d',strtotime($selectedDate));
        $selectedTime=$request->selectedTime;
        $message=$request->message; 
         DB::insert('insert into notifications (title,location,group_id,poll_id,age_group,gender,income,maritial_status,language,image_path,device_type,schedule_date,schedule_time,message) 
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$title,$location,$group,$poll,$agegroup,$gender,$income,$maritial,$language,$image_path,$device_type,$selectedDate,$selectedTime,$message]);
        $status = true;
        $id = DB::getPdo()->lastInsertId();
        echo json_encode($id);  
    }

    public function sendNotification($id)
    {
        $users = DB::table('notifications')->where('id',$id)->select('*')->first(); 
        /* $condition =[
            'city' => $users->location,
            //'group_id'=>$users->group_id,
            //'poll_id'=>$users->poll_id,
            'age'=>$users->age_group,
            'gender'=>$users->gender,
            'income_level'=>$users->income,
            'maritial_status'=>$users->maritial_status,
            //'language'=>$users->language,
            //'device_type'=>$users->device_type,
        ];        

        $fcm_users = DB::table('user_table')->where($condition)->select('*')->get(); 
        dd($fcm_users);exit; */
           

        $device_token = 'fqu1IHnlq9Q:APA91bEP7418Rmc2A8toqwtNxgawsR3XGowp3LFAYGWFR8_uPq3Dv24CKRHAU4ci7ocTJ9b45w90xafiwbUjZolNzuVrkyv-EIV3e2NHXUhzJx7HDM1xl9hA5LPgSQFvNXg6JdI50P5S';
        $tokens = array($device_token);
        $random=(string)mt_rand(1000,9999);
        $header = [
           'Content-Type:application/json',
           'Authorization: Key=AAAAXmNqxY4:APA91bG0X6RHVhwJKXUQGNSSCas44hruFdR6_CFd6WHPwx9abUr-WsrfEzsFInJawElgrp24QzaE4ksfmXu6kmIL6JG3yP487fierMys5byv-I1agRtMPIoSqdgCZf8R0iqsnds-u4CU'
        ];
        $orderLink = 'jainthela://order';			
        $url = 'https://fcm.googleapis.com/fcm/send';      
        $fcmRegIds = array();
        $fields = [
           "notification" => ["user" => $users],
           "content_available" => true,
           "priority" => "high",
           "data" => ["link" => $orderLink,"sound" => "default",'notification_id'=>$random],
           "to" => $device_token,
        ];
        
        define('GOOGLE_API_KEY', 'AAAAXmNqxY4:APA91bG0X6RHVhwJKXUQGNSSCas44hruFdR6_CFd6WHPwx9abUr-WsrfEzsFInJawElgrp24QzaE4ksfmXu6kmIL6JG3yP487fierMys5byv-I1agRtMPIoSqdgCZf8R0iqsnds-u4CU');

        $headers = array(
            'Authorization:key='.GOOGLE_API_KEY,
            'Content-Type: application/json'
        );
        

       $curl = curl_init();
       curl_setopt_array($curl, array(
         CURLOPT_URL => $url,
         CURLOPT_SSL_VERIFYPEER => false,
         CURLOPT_RETURNTRANSFER => true,
         CURLOPT_CUSTOMREQUEST => "POST",
         CURLOPT_POSTFIELDS => json_encode($fields),
         CURLOPT_HTTPHEADER => $headers
       ));
         $response = curl_exec($curl);
       $err = curl_error($curl);

       if ($response === FALSE) {
        die('FCM Send Error: ' . curl_error($curl));
        }else{
            echo $response;
        }

       curl_close($curl);
      
     
       exit;
       // return view('notification.sendNotification');
    }


    public function share()
    {
            $client = new Redis();
            $adapter = new BusQue\Redis\PHPRedis\PHPRedisAdapter($client);
            
            // A Predis adepter is included, although Predis can have issues when used in long-running processes.
            // $client = new Predis\Client();
            // $adapter = new BusQue\Redis\Predis\PredisAdapter($client);
            
            $driver = new BusQue\Redis\RedisDriver($adapter);
            
            // The PHP serializer should fit most use cases:
            $serializer = new BusQue\Serializer\PHPCommandSerializer();
            
            // The MD5 generator creates an ID unique to the serialized command:
            $idGenerator = new BusQue\IdGenerator\Md5IdGenerator($serializer);
            
            $implementation = new BusQue\Implementation(
                // Puts all commands into the "default" queue:
                new BusQue\QueueResolver\SimpleQueueResolver('default'), 
                $serializer,
                $idGenerator,
                // The Redis driver is used as both the queue and scheduler:
                $driver,
                $driver,
                // Always returns the current time:
                new BusQue\SystemClock(),
                // Inject your command bus here:
                new BusQue\Tactician\CommandBusAdapter($commandBus),
                // Inject your logger here:
                new Psr\Log\NullLogger()
            );
            
            $busQue = new BusQue\BusQue($implementation); 
            $command = new SendEmailCommand('joe@example.com', 'Hello Joe!');
            $commandBus->handle(new BusQue\QueuedCommand($command));
            $busQue->workQueue('default'); 
            $commandBus->handle(new BusQue\ScheduledCommand($command, new \DateTime('+1 minute')));
    }




}
