<?php
namespace App\EventListener;

    use Symfony\Component\HttpFoundation\RedirectResponse;
    use App\Entity\Message;
    use Doctrine\Persistence\Event\LifecycleEventArgs;

    class TchatChangeNotifier
    {
        // the entity listener methods receive two arguments:
        // the entity instance and the lifecycle event
        public function postUpdate(Message $tchat, LifecycleEventArgs $event): RedirectResponse
        {
            return $this->redirectToRoute('homepage', [], 301);
        }
    }