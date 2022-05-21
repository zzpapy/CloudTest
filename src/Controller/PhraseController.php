<?php

namespace App\Controller;

use App\Entity\Phrase;
use App\Entity\InterAction;
use App\Form\PhraseFormType;
use App\Form\InterActionFormType;
use PhpParser\Node\Stmt\Interface_;
use App\Repository\PhraseRepository; 
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PhraseController extends AbstractController
{
    private UrlGeneratorInterface $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }
    #[Route('/phrase', name: 'app_phrase')]
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        if ($this->getUser()) {
        $phrase = new Phrase();
        $action = new InterAction();
        $phraseForm = $this->createForm(PhraseFormType::class, $phrase);
        $interactionForm = $this->createForm(InterActionFormType::class, $action);

       
        $phraseForm->handleRequest($request);
        $id = $this->getUser()->getId();
        $listText = $doctrine->getRepository(Phrase::class)->listText($id);
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
                "interactionForm" => $interactionForm->createView(),
                "list" => $listText
            ]);
        }
        return $this->render('phrase/index.html.twig', [
            'controller_name' => 'PhraseController',
            "phraseForm" => $phraseForm->createView(),
            "interactionForm" => $interactionForm->createView(),
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
        $entityManager = $doctrine->getManager();
        $entityManager->remove($phrase);
        $entityManager->flush();
        $response = new Response();
        $response->setContent(json_encode([
            "sales" => "test excell"
        ]));
        return $response;
    }
    #[Route('/action', name: 'app_action')]
    public function action(Request $request,ManagerRegistry $doctrine): Response
    {
        $id = $this->getUser()->getId();
        $date = (new \DateTimeImmutable('NOW'));
        $action = new InterAction();
        $entityManager = $doctrine->getManager();
        $action->setValue($request->query->get("message"));
        $action->setCreatedAt($date);
        $action->setUser( $this->getUser());
        $entityManager->persist($action);
        $entityManager->flush();
        return new RedirectResponse($this->urlGenerator->generate('app_listInter'));
    }

    #[Route('/listInter', name: 'app_listInter')]
    public function listInter(Request $request,ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $entityManager = $doctrine->getManager();
        $id = $this->getUser()->getId();
        $date = (new \DateTimeImmutable('NOW'));
        $messages = $doctrine->getRepository(InterAction::class)->findByUserId($id,$date);
        $listMess = [];
        
        foreach ($messages as $key => $value) {
            // if($key % 2 == 0){
                $id = $value->getUser()->getId();
                $messId = $value->getId();
                $userId = $this->getUser()->getId();
                $date = date_format($value->getCreatedAt(), 'H:i:s');
                // dump($date);die;
                $user = $value->getUser()->getUsername();
                $text = $value->getValue();
                array_push($listMess,["user" => $user,"text" => $text, "date" =>$date, "id" => $id, "userId" => $userId,"messId" => $messId]);

            // }
        };
        
        // dump($listMess);die;

        $response->setContent(json_encode([
            "message" => $listMess
        ]));
        return $response;
    }
}
