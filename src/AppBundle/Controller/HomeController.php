<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class HomeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction()
    {    
//        return $this->render('home/homepage.html.twig');
        $stream = $this->getParameter('web_dir').'\index.html';

        return new BinaryFileResponse($stream);
    }
}