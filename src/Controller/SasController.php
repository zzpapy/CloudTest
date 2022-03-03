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
        $sales = new Sales();
        $salesForm = $this->createForm(SalesFormType::class, $sales);
        if ($this->getUser()) {
            $salesForm->handleRequest($request);
            $dateSearch = (new \DateTimeImmutable('NOW 00:00:00.0'));
            $value = new \DateTimeImmutable('2022-03-02');
            $saless = $doctrine->getRepository(Sales::class)->findBy(["User"=>$this->getUser()->getId(),"CreatedAt"=>$dateSearch]);
            $count = count($saless);
            dump($dateSearch , $dateSearch, $count);
            if ($salesForm->isSubmitted() && $salesForm->isValid()) {
                $entityManager = $doctrine->getManager();
                $sales->setCreatedAt($dateSearch);
                $sales->setUser($this->getUser());
                dump($this->getUser());
                $entityManager->persist($sales);
                $entityManager->flush($sales);
                $date = $sales->getCreatedAt();
                $date->format('d-m-Y H:i:s');
                $saless = $doctrine->getRepository(Sales::class)->findBy(["User"=>$this->getUser()->getId(),"CreatedAt"=>$dateSearch]);
                $count = count($saless);
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
