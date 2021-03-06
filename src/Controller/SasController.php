<?php

namespace App\Controller;

use DateInterval;
use App\Entity\Sales;
use App\Form\SalesFormType;
use App\Repository\SalesRepository; 
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SasController extends AbstractController
{
    #[Route('/sas', name: 'app_sas')]
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        $sales = new Sales();
        
        $response = new Response();
        if ($this->getUser()) {
            $id = $this->getUser()->getId();
            
            $salesForm = $this->createForm(SalesFormType::class, $sales);
            $startDate = new \DateTimeImmutable('NOW');
            $dateSearch = (new \DateTimeImmutable('NOW'));
            $monthSales = $doctrine->getRepository(Sales::class)->salesByMonth($id,$startDate);
            $startDate = $startDate->modify('first day of this month')->setTime(00, 00, 00);
            $lastDay = $startDate->modify('last day of this month')->setTime(23, 59, 99);
            $nbrDayMonth = $startDate->diff($lastDay)->format('%R%a days');

            $allSales = $doctrine->getRepository(Sales::class)->findBY(["User" => $this->getUser()->getId()]);
            if(count($allSales)  != 0 ){
                $start  = $allSales[0]->getCreatedAt()->format('Y-m-d');
                $tabSales = [];
                $tabSales[$start] = [];
                foreach ($allSales as $key => $value) {
                    if($value->getCreatedAt()->format('Y-m-d') == $start){
                        // $tabSales[$start] = $value->getCreatedAt()->format('Y-m-d');
                       array_push($tabSales[$start],$value->getCreatedAt()->format('Y-m-d'));
                    }
                    else{
                        $start  = $value->getCreatedAt()->format('Y-m-d');
                        $tabSales[$start] = [];
                        array_push($tabSales[$start],$value->getCreatedAt()->format('Y-m-d'));
                    }
                }
                
                $i =0;
                $str = str_replace("+","",$nbrDayMonth);
                $str1 = str_replace(" ","",$str);
                $str3 = str_replace("days","",$str1);
                $nbrDay =  intval($str3);
                
                dump(intval($str3),$nbrDayMonth);
                $tableMonth = [];
                while($i < $nbrDay){
                     $test = $startDate->add(new DateInterval('P'.$i.'D'))->format('Y-m-d');
                     $tableMonth[$test] = [];
                     if(array_key_exists($test, $tabSales)){
                         array_push($tableMonth[$test],$tabSales[$start]);
                     }

                     $i++;
                    }
                    dump($tableMonth);
                 dump($test);
                $daySales = $doctrine->getRepository(Sales::class)->salesByDay($id,$dateSearch);
                $countSalesDay = count($daySales);
                

            }
            else{
                $monthSales = [];
                $countSalesDay = 0;
            }
           
           $salesForm->handleRequest($request);
           $tabSales = [];
            if ($salesForm->isSubmitted() && $salesForm->isValid()) {

                $entityManager = $doctrine->getManager();
                $sales->setCreatedAt($dateSearch);
                $sales->setUser($this->getUser());
               
                $entityManager->persist($sales);
                $entityManager->flush($sales);
                $date = $sales->getCreatedAt();
                $date->format('d-m-Y H:i:s');
                $daySales = $doctrine->getRepository(Sales::class)->salesByDay($id,$dateSearch);
                $countSalesDay = count($daySales);
                $monthSales = $doctrine->getRepository(Sales::class)->salesByMonth($id,$startDate);
                $count = count($monthSales);

                $allSales = $doctrine->getRepository(Sales::class)->findBY(["User" => $this->getUser()->getId()]);
                $start  = $allSales[0]->getCreatedAt()->format('Y-m-d');
                if(count($monthSales)  != 0 ){
                    $start  = $monthSales[0]->getCreatedAt()->format('Y-m-d');
                    $tabSales = [];
                    $tabSales[$start] = [];
                    foreach ($monthSales as $key => $value) {
                        if($value->getCreatedAt()->format('Y-m-d') == $start){
                            // $tabSales[$start] = $value->getCreatedAt()->format('Y-m-d');
                           array_push($tabSales[$start],$value->getCreatedAt()->format('Y-m-d'));
                        }
                        else{
                            $start  = $value->getCreatedAt()->format('Y-m-d');
                            $tabSales[$start] = [];
                            array_push($tabSales[$start],$value->getCreatedAt()->format('Y-m-d'));
                        }
                    }
                    $daySales = $doctrine->getRepository(Sales::class)->salesByDay($id,$dateSearch);
                    $countSalesDay = count($daySales);
                }
                $response->setContent(json_encode([
                    "sales" => $sales->getType(),
                    "date" => $date,
                    "count" => $countSalesDay,
                    "monthSales" => count($monthSales),
                    "tabSales" => $tabSales
                ]));
                return $response;

            }
           
            return $this->render('sas/index.html.twig', [
                'controller_name' => 'SasController',
                "salesForm" => $salesForm->createView(),
                "count" => $countSalesDay,
                "monthSales" => count($monthSales),
                "tabSales" => $tabSales
            ]);
        }
        else{
            return $this->redirectToRoute('app_login');
        }
    }

    #[Route('/chart', name: 'app_chart')]
    public function chart(Request $request,ManagerRegistry $doctrine): Response
    {
        $sales = new Sales();
        
        $response = new Response();
        if ($this->getUser()) {
            $id = $this->getUser()->getId();
            
            $salesForm = $this->createForm(SalesFormType::class, $sales);
            $startDate = new \DateTimeImmutable('NOW');
            $dateSearch = (new \DateTimeImmutable('NOW'));
            $startDate = $startDate->modify('first day of this month')->setTime(00, 00, 00);
            
            $monthSales = $doctrine->getRepository(Sales::class)->salesByMonth($id,$startDate);
            
            $allSales = $doctrine->getRepository(Sales::class)->findBY(["User" => $this->getUser()->getId()]);
            
            if(count($monthSales)  != 0 ){
                $start  = $monthSales[0]->getCreatedAt()->format('Y-m-d');
                $tabSales = [];
                $tabSales[$start] = [];
                foreach ($monthSales as $key => $value) {
                    if($value->getCreatedAt()->format('Y-m-d') == $start){
                        // $tabSales[$start] = $value->getCreatedAt()->format('Y-m-d');
                       array_push($tabSales[$start],$value->getCreatedAt()->format('Y-m-d'));
                    }
                    else{
                        $start  = $value->getCreatedAt()->format('Y-m-d');
                        $tabSales[$start] = [];
                        array_push($tabSales[$start],$value->getCreatedAt()->format('Y-m-d'));
                    }
                }

                $lastDay = $startDate->modify('last day of this month')->setTime(23, 59, 99);
                $nbrDayMonth = $startDate->diff($lastDay)->format('%R%a days');
                $i =0;
                $str = str_replace("+","",$nbrDayMonth);
                $str1 = str_replace(" ","",$str);
                $str3 = str_replace("days","",$str1);
                $nbrDay =  intval($str3);
                dump(intval($str3),$nbrDayMonth);
                $tableMonth = [];
                while($i < $nbrDay){
                     $test = $startDate->add(new DateInterval('P'.$i.'D'))->format('Y-m-d');
                     $tableMonth[$test] = [];
                     if(array_key_exists($test, $tabSales)){
                         array_push($tableMonth[$test],$tabSales[$start]);
                     }

                     $i++;
                    }
                    dump($tableMonth);
                 dump($test);
                $daySales = $doctrine->getRepository(Sales::class)->salesByDay($id,$dateSearch);
                $countSalesDay = count($daySales);
                

            }
            else{
                $monthSales = [];
                $countSalesDay = 0;
            }
        };
        $response->setContent(json_encode([
            "sales" => $sales->getType(),
            // "date" => $date,
            "count" => $countSalesDay,
            "ventesMois" => $monthSales,
            "monthSales" => count($monthSales),
            "tabSales" => $tabSales
        ]));
        return $response;
    }

    #[Route('/ajax', name: 'app_ajax')]
    public function ajax(Request $request,ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $response->setContent(json_encode([
            "sales" => "test excell"
        ]));
        return $response;
    }
}
