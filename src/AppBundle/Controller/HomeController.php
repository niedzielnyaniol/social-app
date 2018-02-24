<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class HomeController extends Controller
{
    public function homeAction()
    {
        if($this->get('security.authorization_checker')->isGranted('ROLE_USER')){
            $stream = $this->getParameter('web_dir').'\tab.html';

            return new BinaryFileResponse($stream);
        }

        return $this->render('home/homepage.html.twig');
    }
}