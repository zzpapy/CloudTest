<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class TchatController extends AbstractController
{
    #[Route('/tchat', name: 'app_tchat')]
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $mess = new Message();
        $date = (new \DateTimeImmutable('NOW'));
        $entityManager = $doctrine->getManager();
        // dump($request->query);die;
        $mess->setMessage($request->query->get("message"));
        $mess->setUser($this->getUser());
        $mess->setCreatedAt($date);
        $entityManager->persist($mess);
        $entityManager->flush($mess);

        $messages = $doctrine->getRepository(Message::class)->findAll();
        // dump($messages);
        $listMess = [];

        foreach ($messages as $key => $value) {
            if($key % 2 == 0){
                $user = $value->getUser()->getUsername();
                $text = $value->getMessage();
                array_push($listMess,["user" => $user,"text" => $text]);

            }
        };
        

        $response->setContent(json_encode([
            "message" => $listMess
        ]));
        return $response;
    }
    #[Route('/init', name: 'app_init')]
    public function init(Request $request,ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $entityManager = $doctrine->getManager();
        
        $messages = $doctrine->getRepository(Message::class)->findAll();
        // dump($messages);
        $listMess = [];
        
        foreach ($messages as $key => $value) {
            if($key % 2 == 0){
                $user = $value->getUser()->getUsername();
                $text = $value->getMessage();
                array_push($listMess,["user" => $user,"text" => $text]);

            }
        };
        
        // dump($listMess);die;

        $response->setContent(json_encode([
            "message" => $listMess
        ]));
        return $response;
    }
}