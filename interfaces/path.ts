import { Router } from "express";

export interface Path {
    url: string;
    router: Router;
}