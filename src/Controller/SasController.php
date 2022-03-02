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
        $response = new Response();
        if ($this->getUser()) {
            $sales = new Sales();
            $salesForm = $this->createForm(SalesFormType::class, $sales);
            $salesForm->handleRequest($request);

            $saless = $doctrine->getRepository(Sales::class)->findById($this->getUser()->getId());
            $count = count($saless);
            dump($count);
            if ($salesForm->isSubmitted() && $salesForm->isValid()) {
                $entityManager = $doctrine->getManager();
                $sales->setCreatedAt(new \DateTimeImmutable('NOW'));
                $sales->setUser($this->getUser());
                dump($this->getUser());
                $entityManager->persist($sales);
                $entityManager->flush($sales);
                $date = $sales->getCreatedAt();
                $date->format('d-m-Y H:i:s');
                $saless = $doctrine->getRepository(sales::class)->findById($this->getUser()->getId());
                dump($sales);
                $response->setContent(json_encode([
                    "sales" => $sales->getType(),
                    "date" => $date,
                    "count" => $count,
                    "saless" => $saless
                ]));
                return $response;

            }
        }
        return $this->render('sas/index.html.twig', [
            'controller_name' => 'SasController',
            "salesForm" => $salesForm->createView(),
            "count" => $count
        ]);
    }
}
