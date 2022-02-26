<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SasController extends AbstractController
{
    #[Route('/sas', name: 'app_sas')]
    public function index(): Response
    {
        return $this->render('sas/index.html.twig', [
            'controller_name' => 'SasController',
        ]);
    }
}
