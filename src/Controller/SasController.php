<?php

namespace App\Controller;

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
        
        $id = $this->getUser()->getId();
        
        $salesForm = $this->createForm(SalesFormType::class, $sales);
        $startDate = new \DateTimeImmutable('NOW');
        $dateSearch = (new \DateTimeImmutable('NOW'));
        $startDate = $startDate->modify('first day of this month')->setTime(00, 00, 00);
        
        $monthSales = $doctrine->getRepository(Sales::class)->salesByMonth($id,$startDate);
        $count = count($monthSales);

        $daySales = $doctrine->getRepository(Sales::class)->salesByDay($id,$dateSearch);
        $countSalesDay = count($daySales);
        dump($daySales);
        $response = new Response();
        if ($this->getUser()) {
            $salesForm->handleRequest($request);
           
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
                $response->setContent(json_encode([
                    "sales" => $sales->getType(),
                    "date" => $date,
                    "count" => $countSalesDay,
                    "monthSales" => $monthSales
                ]));
                return $response;

            }
            return $this->render('sas/index.html.twig', [
                'controller_name' => 'SasController',
                "salesForm" => $salesForm->createView(),
                "count" => $countSalesDay,
                "monthSales" => $monthSales
            ]);
        }
        else{
            return $this->redirectToRoute('app_login');
        }
    }
}
