<?php

namespace App\Controller;

use App\Entity\Phrase;
use App\Form\PhraseFormType;
use App\Repository\PhraseRepository; 
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PhraseController extends AbstractController
{
    #[Route('/phrase', name: 'app_phrase')]
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        $phrase = new Phrase();
        $phraseForm = $this->createForm(PhraseFormType::class, $phrase);

       
        $phraseForm->handleRequest($request);
        $id = $this->getUser()->getId();
        $listText = $doctrine->getRepository(Phrase::class)->listText($id);
        dump($listText);

        if ($phraseForm->isSubmitted() && $phraseForm->isValid()) {
            $entityManager = $doctrine->getManager();
            dump($phraseForm);
            $phrase->setUser($this->getUser());
            
            $entityManager->persist($phrase);
            $entityManager->flush($phrase);
            $listText = $doctrine->getRepository(Phrase::class)->listText($id);
            return $this->render('phrase/index.html.twig', [
                'controller_name' => 'PhraseController',
                "phraseForm" => $phraseForm->createView(),
                "list" => $listText
            ]);
        }
        return $this->render('phrase/index.html.twig', [
            'controller_name' => 'PhraseController',
            "phraseForm" => $phraseForm->createView(),
            "list" => $listText
        ]);
    }
}
