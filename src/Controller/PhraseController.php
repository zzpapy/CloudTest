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
        if ($this->getUser()) {
        $phrase = new Phrase();
        $phraseForm = $this->createForm(PhraseFormType::class, $phrase);

       
        $phraseForm->handleRequest($request);
        $id = $this->getUser()->getId();
        $listText = $doctrine->getRepository(Phrase::class)->listText($id);
        dump($phraseForm->getExtraData());
        dump($listText);
            dump($phraseForm);
        if ($phraseForm->isSubmitted() && $phraseForm->isValid()) {
            $entityManager = $doctrine->getManager();
            $phrase->setUser($this->getUser());
            $phrase->setTexte($phraseForm->getExtraData()["Texte"]);
            
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
    else{
        return $this->redirectToRoute('app_login');
    }
    }
    #[Route('/delete', name: 'app_delete')]
    public function delete(Request $request,ManagerRegistry $doctrine): Response
    {
        $id = $request->request->get('id');
        $phrase = $doctrine->getRepository(Phrase::class)->find($id);
        // dump($id,$phrase);die;
        $entityManager = $doctrine->getManager();
        $entityManager->remove($phrase);
        $entityManager->flush();
        $response = new Response();
        $response->setContent(json_encode([
            "sales" => "test excell"
        ]));
        return $response;
    }
}
